import { AxiosRequestConfig } from 'axios';
import request from 'api/request';
import { store } from 'app-redux/store';
import { setUserInfo, logOutUser } from 'app-redux/userInfo/actions';
import { logger } from 'utilities/helper';
import { getProfile, login } from 'api/modules/api-app/authenticate';
import { useState } from 'react';
import AlertMessage from 'components/base/AlertMessage';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
export interface LoginRequestParams extends AxiosRequestConfig {
    email: string;
    password: string;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: () => Promise<void>;
}

export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(logOutUser());
    },
    handlerLogin: (user: any) => {
        const saveUserInfor = setUserInfo(user);
        store.dispatch(saveUserInfor);
    },
};

export const useLogin = (options: LoginRequestParams): LoginRequest => {
    const [loading, setLoading] = useState(true);
    const requestLogin = async () => {
        try {
            const response = await login(options);
            const signInAction = setUserInfo(response?.data);
            store.dispatch(signInAction);
            const userResponse = await getProfile();
            AuthenticateService.handlerLogin({
                ...response,
                user: userResponse,
            });
        } catch (e) {
            AlertMessage(e);
            logger(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        requestLogin,
    };
};

export default AuthenticateService;
