import { AxiosRequestConfig, AxiosResponse } from 'axios';
import request from 'api/request';
import { store } from 'app-redux/store';
import { clearUserInfo, setUserInfo } from 'app-redux/authentication/actions';
import { useState } from 'react';
import { logger } from 'utilities/helper';
import { useRequest } from 'ahooks';
import apiAuthenticate from 'api/modules/api-app/authenticate';
import apiUser from 'api/modules/api-app/user';

const AUTH_URL_REGISTER = '/register';
const AUTH_URL_VERIFY_OTP = '/verify';
const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
const AUTH_URL_LOGIN = '/login';

export interface LoginRequestParams extends AxiosRequestConfig {
    username: string;
    password: string;
}

export interface LoginRequestResponse extends AxiosResponse {
    token: string;
    refreshToken: string;
}

export interface RegisterRequestParams extends AxiosRequestConfig {
    phone: string;
    password: string;
    email: string;
    name: string;
    address: any;
    birthday: any;
    gender: any;
}

class AuthenticateService {
    validPhonePasswordEmail = (phone: string, pwd: string, email?: string): boolean => {
        if (!(phone && pwd)) {
            return false;
        }
        if (phone.length < 6 || pwd.length < 8 || pwd.length > 16) {
            return false;
        }
        if (email === '' && email.length < 2) {
            return false;
        }
        return true;
    };

    register = async (options: RegisterRequestParams) => {
        try {
            return await request.post(AUTH_URL_REGISTER, {
                phone: options.phone.trim(),
                password: options.password,
                email: options.email.trim(),
                name: options.name.trim(),
                address: options.address,
                birthday: options.birthday,
                gender: options.gender,
            });
        } catch (error) {
            logger(error);
            return null;
        }
    };

    verifySMSOtp = async (token: string, smsOtp: string) => {
        try {
            return await request.post(
                AUTH_URL_VERIFY_OTP,
                {
                    code: Number.parseInt(smsOtp, 10),
                    type: 'reg',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (error) {
            logger(error);
            return null;
        }
    };

    refreshToken = (refreshToken: string) => {
        return request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: refreshToken,
        });
    };

    logOut = () => {
        store.dispatch(clearUserInfo());
    };
}

interface LoginRequest {
    loading: boolean;
    login: () => Promise<void>;
    error: any;
}

export const useLogin = (options: LoginRequestParams): LoginRequest => {
    const { loading, run, error } = useRequest(apiAuthenticate.login, {
        manual: true,
        throwOnError: true,
    });

    const userInfoRequest = useRequest(apiUser.getUserDetail, {
        manual: true,
        throwOnError: true,
    });

    let errorData;
    if (error || userInfoRequest.error) {
        errorData = {
            loginError: error,
            userInfoError: userInfoRequest.error,
        };
    }

    const login = async () => {
        try {
            const response = await run(options.username, options.password);
            if (response) {
                const userResponse = await userInfoRequest.run();
                const signInAction = setUserInfo(response.token, response.refreshToken, {
                    id: userResponse.id,
                    name: userResponse.name,
                    email: userResponse.email,
                });
                store.dispatch(signInAction);
            }
        } catch (e) {
            logger(e);
        } finally {
            logger('You should remove finally in your code', true);
            const signInAction = setUserInfo('DUMMY_TOKEN', 'DUMMY_REFRESH', {
                id: 1,
                name: 'username',
                email: 'username@gmail.com',
            });
            store.dispatch(signInAction);
        }
    };

    return {
        loading,
        login,
        error: errorData,
    };
};

export default new AuthenticateService();
