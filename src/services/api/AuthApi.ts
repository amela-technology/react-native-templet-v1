import request from "./config/request"
import {AUTH_URL} from "./config/urls"

const AuthApi = {
    login: async (email: string, password: string) => {
        return await request.post(AUTH_URL.login, {
            email,
            password,
        })
    },
    logout: async (token: string) => {
        return await request.post(AUTH_URL.logout, {
            token,
        })
    },
    refreshToken: async (storedRefreshToken: string) => {
        return await request.post(AUTH_URL.refreshToken, {
            storedRefreshToken,
        })
    },
}
export default AuthApi
