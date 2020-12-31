import { store } from 'app-redux/store';
import { setUserInfo } from 'app-redux/userInfo/actions';
import { logger } from 'utilities/helper';

const TokenProvider = {
    setAllNewToken: (token: string, refreshToken: string) => {
        const { userInfo } = store.getState();
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(setUserInfo({ token, refreshToken, user: userInfo?.user || undefined }));
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
        store.dispatch(setUserInfo({}));
    },
};

export default TokenProvider;
