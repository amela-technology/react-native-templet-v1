import { AxiosRequestConfig, AxiosResponse } from 'axios';
import request from 'api/request';
import { store } from 'app-redux/store';
import setUserInfo from 'app-redux/authentication/actions';
import { logger } from 'utilities/helper';
import { useRequest } from 'ahooks';
import apiUser from 'api/modules/api-app/user';
import { login } from 'api/modules/api-app/authenticate';

const AUTH_URL_REFRESH_TOKEN = '/refreshToken';

export interface LoginRequestParams extends AxiosRequestConfig {
    username: string;
    password: string;
}

interface LoginRequest {
    loading: boolean;
    requestLogin: () => Promise<void>;
    error: any;
}

const AuthenticateService = {
    refreshToken: (inputRefreshToken: string) =>
        request.post(AUTH_URL_REFRESH_TOKEN, {
            refresh_token: inputRefreshToken,
        }),
    logOut: () => {
        store.dispatch(setUserInfo({}));
    },
};

export const useLogin = (options: LoginRequestParams): LoginRequest => {
    const { loading, run, error } = useRequest(login, {
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

    const requestLogin = async () => {
        try {
            const response = await run(options.username, options.password);
            if (response) {
                const userResponse = await userInfoRequest.run();
                const signInAction = setUserInfo({
                    userToken: response.token,
                    refreshToken: response.refreshToken,
                    user: {
                        id: userResponse.id,
                        name: userResponse.name,
                        email: userResponse.email,
                    },
                });
                store.dispatch(signInAction);
            }
        } catch (e) {
            logger(e);
        } finally {
            logger('You should remove finally in your code', true);
            const signInAction = setUserInfo({
                userToken: 'DUMMY_TOKEN',
                refreshToken: 'DUMMY_REFRESH',
                user: {
                    id: 1,
                    name: 'username',
                    email: 'username@gmail.com',
                },
            });
            store.dispatch(signInAction);
        }
    };

    return {
        loading,
        requestLogin,
        error: errorData,
    };
};

export default AuthenticateService;
