import axios from 'axios';
import Config from 'react-native-config';
import TokenProvider from 'utilities/authenticate/TokenProvider';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { logger, renderAlert } from 'utilities/helper';
import NetInfo from '@react-native-community/netinfo';
import { apiLogger } from 'utilities/logger';
import { ERRORS } from 'utilities/staticData';

const AUTH_URL_REFRESH_TOKEN = `${Config.API_URL}auth/refresh-token`;

const DEFAULT_ERROR_MESSAGE = 'Unknown Error';
const NETWORK_ERROR_MESSAGE = 'common.networkError';

let validNetwork = true;
let isShowNetwork = false;

const request = axios.create({
    baseURL: Config.API_URL,
    timeout: 8000,
    headers: { Accept: '*/*' },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const rejectNetwork = (err: string, isNetWork: boolean) => {
    if (isNetWork !== false) {
        return Promise.reject(err);
    }
    return Promise.reject(ERRORS.network);
};

request.interceptors.request.use(
    async (config: any) => {
        // Do something before api is sent
        const token = TokenProvider.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const network: any = await NetInfo.fetch();
        // validNetwork on first render in ios will return null
        validNetwork = network.isInternetReachable && network.isConnected;
        if (validNetwork === false && !isShowNetwork) {
            isShowNetwork = true;
            renderAlert(NETWORK_ERROR_MESSAGE, () => {
                isShowNetwork = false;
            });
        }
        return config;
    },
    (error: any) => {
        // Do something with api error
        apiLogger(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    (response: any) => response.data,
    async (error: any) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {};
        const { data } = response || {};
        const { errorMessage, errorKey } = data || {};
        apiLogger(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        const originalRequest = error.config;
        if (errorMessage === 'RefreshToken_NotExist') {
            logger('RefreshToken_NotExist => logout');
            // logout here
            AuthenticateService.logOut();
            return Promise.reject(error);
        }
        if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                try {
                    const queuePromise: any = await new Promise((resolve: any, reject: any) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers.Authorization = `Bearer ${queuePromise.token}`;
                    return request(originalRequest);
                } catch (err) {
                    return rejectNetwork(err, validNetwork);
                }
            }
            logger('refreshing token...');
            originalRequest.retry = true;
            isRefreshing = true;
            const localRefreshToken = TokenProvider.getRefreshToken();
            try {
                const refreshTokenResponse = await axios.post(AUTH_URL_REFRESH_TOKEN, {
                    refreshToken: localRefreshToken,
                });
                const { token, refreshToken } = refreshTokenResponse.data;
                TokenProvider.setAllNewToken(token, refreshToken);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                processQueue(null, token);
                return request(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return rejectNetwork(err, validNetwork);
            } finally {
                isRefreshing = false;
            }
        }
        error.message = errorMessage || DEFAULT_ERROR_MESSAGE;
        error.keyMessage = errorKey || '';
        return rejectNetwork(error.message, validNetwork);
    },
);

export default request;
