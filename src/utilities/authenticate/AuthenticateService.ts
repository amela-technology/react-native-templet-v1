import { TypeLoginRequest } from 'api/interface/authenticate';
import { login } from 'api/modules/api-app/authenticate';
import request from 'api/request';
import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import AlertMessage from 'components/base/AlertMessage';
import { useState } from 'react';
import { logger } from 'utilities/helper';
import { deleteTagOneSignal, pushTagMember } from 'utilities/notification';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';

interface LoginRequest {
    loading: boolean;
    requestLogin: (values: TypeLoginRequest) => Promise<void>;
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
        store.dispatch(userInfoActions.logOut());
        deleteTagOneSignal();
    },
    handlerLogin: (token: Record<string, string>) => {
        const { userInfo } = store.getState();
        store.dispatch(userInfoActions.updateToken(token));
        pushTagMember(userInfo.user?.id as number);
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const requestLogin = async (options: TypeLoginRequest) => {
        try {
            setLoading(true);
            const response = await login(options);
            store.dispatch(userInfoActions.getUserInfoRequest(response?.data?.token));
            AuthenticateService.handlerLogin({ ...response.data });
        } catch (e) {
            AlertMessage(String(e));
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
