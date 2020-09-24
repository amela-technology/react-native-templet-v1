/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import axios from 'axios';
import Config from 'react-native-config';
import i18next from 'utilities/i18next';
import TokenProvider from 'utilities/authenticate/TokenProvider';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { AUTH_URL } from 'api/urls';

const request = axios.create({
    baseURL: Config.API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

request.interceptors.request.use(
    async (config: any) => {
        // Do something before api is sent
        const userToken = TokenProvider.getToken();
        if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        // __DEV__ &&
        //     console.log(
        //         `%c ${config.method?.toUpperCase()} from ${config.url}:`,
        //         'background: ' + 'yellow' + '; color: #000',
        //         config,
        //     )
        return config;
    },
    (error: any) => {
        // Do something with api error
        // __DEV__ &&
        //     console.log(
        //         `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
        //         'background: ' + 'red' + '; color: #fff',
        //         error.response,
        //     )
        return Promise.reject(error);
    },
);
request.interceptors.response.use(
    (response: any) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // __DEV__ &&
        //     console.log(
        //         `%c SUCCESS ${response.config.method?.toUpperCase()} from ${response.config.url}:`,
        //         'background: ' + 'green' + '; color: #fff',
        //         response.data,
        //     )
        return response.data;
    },
    async (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {};
        const { data } = response || {};
        const { errorMessage, errorKey } = data || {};
        // __DEV__ &&
        //     console.log(
        //         `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
        //         'background: ' + 'red' + '; color: #fff',
        //         error.response,
        //     )
        const originalRequest = error.config;
        if (errorMessage === 'RefreshToken_NotExist') {
            console.log('RefreshToken_NotExist => logout');
            // logout here
            AuthenticateService.logOut();
            return Promise.reject(error);
        }
        if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve: any, reject: any) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token: any) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return request(originalRequest);
                    })
                    .catch((err: any) => {
                        return Promise.reject(err);
                    });
            }
            // console.log('refreshing token...')
            originalRequest.retry = true;
            isRefreshing = true;
            const localRefreshToken = TokenProvider.getRefreshToken();
            return new Promise((resolve: any, reject: any) => {
                // we use pure axios when refreshing token
                axios
                    .post(`${Config.API_URL}/${AUTH_URL.refreshToken}`, {
                        refreshToken: localRefreshToken,
                    })
                    .then(async ({ data: responseData }: any) => {
                        const { token, refreshToken } = responseData.data;
                        TokenProvider.setAllNewToken(token, refreshToken);
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        processQueue(null, token);
                        resolve(request(originalRequest));
                    })
                    .catch((err: any) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .then(() => {
                        isRefreshing = false;
                    });
            });
        }
        error.message = errorMessage || i18next.t('errorMessage.common.requestFailed');
        error.keyMessage = errorKey || '';
        return Promise.reject(error);
    },
);
export default request;
