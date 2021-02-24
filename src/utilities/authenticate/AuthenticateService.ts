import { AxiosRequestConfig } from 'axios';
import request from 'api/request';
import { store } from 'app-redux/store';
import { setUserInfo, logOutUser } from 'app-redux/userInfo/actions';
import { logger } from 'utilities/helper';
import { getProfile, login } from 'api/modules/api-app/authenticate';
import { useState } from 'react';
import AlertMessage from 'components/base/AlertMessage';
import { deleteTagOneSignal, pushTagMember } from 'utilities/notification';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';
export interface LoginRequestParams extends AxiosRequestConfig {
    email: string;
    password: string;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: any) => Promise<void>;
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
        deleteTagOneSignal();
    },
    handlerLogin: (user: any) => {
        const saveUserInfo = setUserInfo(user);
        store.dispatch(saveUserInfo);
        pushTagMember(user?.user?.id);
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const requestLogin = async (options: LoginRequestParams) => {
        try {
            setLoading(true);
            const response = await login(options);
            const userResponse = await getProfile(response?.data?.token);
            AuthenticateService.handlerLogin({
                ...response.data,
                user: userResponse?.data,
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
