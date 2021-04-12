import axios from 'axios'
import Config from 'react-native-config'
import i18next from 'shared/utilities/i18next'
import TokenProvider from 'services/authenticate/TokenProvider'
import AuthenticateService from 'services/authenticate/AuthenticateService'
const AUTH_URL_REFRESH_TOKEN = `${Config.API_URL}auth/request-access-token`

const request = axios.create({
    baseURL: Config.API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
})
// for multiple requests
let isRefreshing = false
let failedQueue: any = []

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

request.interceptors.request.use(
    async (config: any) => {
        // Do something before api is sent
        const token = TokenProvider.getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: any) => {
        // Do something with api error
        return Promise.reject(error)
    },
)

request.interceptors.response.use(
    (response: any) => {
        return response?.data
    },
    async (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {}
        const { data } = response || {}
        const { errorMessage, errorKey, errorCode } = data || {}

        const originalRequest = error.config
        if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                try {
                    const queuePromise: any = await new Promise((resolve: any, reject: any) => {
                        failedQueue.push({ resolve, reject })
                    })
                    originalRequest.headers.Authorization = `Bearer ${queuePromise.token}`
                    return request(originalRequest)
                } catch (err) {
                    return Promise.reject(err)
                }
            }
            console.log('refreshing token...')
            originalRequest.retry = true
            isRefreshing = true
            const localRefreshToken = TokenProvider.getRefreshToken()
            const refreshTokenResponse = await axios
                .post(AUTH_URL_REFRESH_TOKEN, {
                    refreshToken: localRefreshToken,
                })
                .then((responseToken: any) => {
                    const { token, refreshToken } = responseToken?.data?.data //Tuỳ dự án  responseToken?.data?.data || responseToken?.data
                    TokenProvider.setAllNewToken(token, refreshToken)
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    isRefreshing = false
                    processQueue(null, token)
                    return request(originalRequest)
                })
                .catch((err: any) => {
                    isRefreshing = false
                    //405 : Status code refreshToken Expire
                    if (err.response.status === 405) {
                        AuthenticateService.logOut()
                        return
                    }
                    processQueue(err, null)
                    Promise.reject(err)
                })
        }
        error.message = errorMessage || i18next.t('common.errorMessage.requestFailed')
        return Promise.reject(error.message || error)
    },
)

export default request
