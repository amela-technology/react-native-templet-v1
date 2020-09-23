/* eslint-disable no-console */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import request from 'api/request'
import { AUTH_URL } from 'api/urls'
import { store } from 'redux/store'
import { signOut, signIn } from 'redux/authentication/actions'
import { useState } from 'react'

export interface LoginRequestParams extends AxiosRequestConfig {
    username: string
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
                code: Number.parseInt(smsOtp, 10),
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

    logOut() {
        store.dispatch(signOut())
    }
}

interface LoginRequest {
    loading: boolean
    login: () => Promise<void>
    error: any
}

export const useLogin = (options: LoginRequestParams): LoginRequest => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    const login = async () => {
        try {
            setLoading(true)
            const response = await request.post<LoginRequestResponse>(AUTH_URL.login, options)
            if (response) {
                // using data to set token
                const { data } = response
                setLoading(false)
                const signInAction = signIn('DUMMY_TOKEN', 'DUMMY_REFRESH', 1)
                store.dispatch(signInAction)
            }
        } catch (error) {
            setLoading(false)
            setError(error)
            __DEV__ && console.log(error)
        } finally {
            __DEV__ && console.warn('You should remove finally in your code')
            const signInAction = signIn('DUMMY_TOKEN', 'DUMMY_REFRESH', 1)
            store.dispatch(signInAction)
        }
    }

    return { loading, login, error }
}

export default new AuthenticateService()
