import request from './config/request'
import {AUTH_URL} from './config/urls'

const AuthApi = {
    login: (email: string, password: string) => request.post(AUTH_URL.login, {email, password}),
    refreshToken: (storedRefreshToken: string) => request.post(AUTH_URL.refreshToken, {storedRefreshToken}),
}
export default AuthApi
