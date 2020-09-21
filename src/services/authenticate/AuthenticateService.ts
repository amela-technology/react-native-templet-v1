// import appleAuth, {AppleAuthRequestOperation, AppleAuthRequestScope} from "@invertase/react-native-apple-authentication"
import {AxiosRequestConfig, AxiosResponse} from 'axios'
import request from '../../api/config/request'
import {AUTH_URL} from '../../api/config/urls'
// import {dismissDialog} from "services/dialog/DialogService"
import TokenProvider from '../../services/authenticate/TokenProvider'
import NavigationService from '../../services/navigation/NavigationService'
import {LOGIN_ROUTE} from '../../services/navigation/config/routes'

export interface LoginRequestParams extends AxiosRequestConfig {
    phone: string
    password: string
}

export interface LoginRequestResponse extends AxiosResponse {
    token: string
    refreshToken: string
}
export interface RegisterRequestParams extends AxiosRequestConfig {
    phone: string
    password: string
    email: string
    name: string
    address: any
    birthday: any
    gender: any
}
class AuthenticateService {
    validPhonePasswordEmail(phone: string, pwd: string, email?: string): boolean {
        if (!(phone && pwd)) {
            return false
        }
        if (phone.length < 6 || pwd.length < 8 || pwd.length > 16) {
            return false
        }
        if (email === '' && email.length < 2) {
            return false
        }
        return true
    }
    // async handleAppleIdPress() {
    //     return await appleAuth.performRequest({
    //         requestedOperation: AppleAuthRequestOperation.LOGIN,
    //         requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    //     })
    // }
    async login(options: LoginRequestParams) {
        return request.post<LoginRequestResponse>(AUTH_URL.login, options)
    }
    async register(options: RegisterRequestParams) {
        return await request.post(AUTH_URL.register, {
            phone: options.phone.trim(),
            password: options.password,
            email: options.email.trim(),
            name: options.name.trim(),
            address: options.address,
            birthday: options.birthday,
            gender: options.gender,
        })
    }
    async verifySMSOtp(token: string, smsOtp: string) {
        return await request.post(
            AUTH_URL.verifyOTP,
            {
                code: Number.parseInt(smsOtp),
                type: 'reg',
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        )
    }
    async refreshToken(refreshToken: string) {
        return request.post(AUTH_URL.refreshToken, {
            refresh_token: refreshToken,
        })
    }
    async logOut() {
        await TokenProvider.clearToken()
        // dismissDialog()
        // NavigationService.navigate(LOGIN_ROUTE.start)
    }
}
export default new AuthenticateService()
