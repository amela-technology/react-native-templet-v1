import Api from "../../services/request/RequestServices"
import {AuthUrl} from "./config/Urls"

const AuthApi = {
    login: async (email: string, password: string) => {
        return await Api.post(AuthUrl.LOGIN, {
            email,
            password,
        })
    },
    logout: async (token: string) => {
        return await Api.post(AuthUrl.LOGOUT, {
            token,
        })
    },
    refreshToken: async (storedRefreshToken: string) => {
        return await Api.post(AuthUrl.REFRESH_TOKEN, {
            storedRefreshToken,
        })
    },
}
export {AuthApi}
