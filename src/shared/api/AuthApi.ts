import Api from "../../services/request/ApiServices"
import {AuthUrl} from "../../services/request/config/Urls"

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
    refreshToken: async (refreshToken: string) => {
        return await Api.post(AuthUrl.REFRESH_TOKEN, {
            refreshToken,
        })
    },
}
export {AuthApi}
