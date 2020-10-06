import { store } from 'app-redux/store';
import setUserInfo from 'app-redux/authentication/actions';
import { logger } from 'utilities/helper';

const TokenProvider = {
    setAllNewToken: (token: string, refreshToken: string) => {
        const { authentication } = store.getState();
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(setUserInfo({ userToken: token, refreshToken, user: authentication?.user || undefined }));
    },
    getToken: () => {
        const { authentication } = store.getState();
        return authentication.userToken || '';
    },
    getRefreshToken: () => {
        const { authentication } = store.getState();
        return authentication.refreshToken || '';
    },
    clearToken: () => {
        store.dispatch(setUserInfo({}));
    },
};

export default TokenProvider;
