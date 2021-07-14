import { userInfoActions } from 'app-redux/slices/userInfoSlice';
import { store } from 'app-redux/store';
import { logger } from 'utilities/helper';

const TokenProvider = {
    setAllNewToken: (token: string, refreshToken: string) => {
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(userInfoActions.updateToken({ token, refreshToken }));
    },
    getToken: () => {
        const { userInfo } = store.getState();
        return userInfo.token || '';
    },
    getRefreshToken: () => {
        const { userInfo } = store.getState();
        return userInfo.refreshToken || '';
    },
    clearToken: () => {
        store.dispatch(userInfoActions.updateToken({ token: undefined, refreshToken: undefined }));
    },
};

export default TokenProvider;
