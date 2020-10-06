import AsyncStorage from '@react-native-community/async-storage';
import { store } from 'app-redux/store';
import setUserInfo from 'app-redux/authentication/actions';
import { logger } from 'utilities/helper';

const TokenProvider = () => {
    const setAllNewToken = (token: string, refreshToken: string) => {
        const { authentication } = store.getState();
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(setUserInfo({ userToken: token, refreshToken, user: authentication?.user || undefined }));
    };

    const getToken = (): string => {
        const { authentication } = store.getState();
        return authentication.userToken || '';
    };

    const getRefreshToken = (): string => {
        const { authentication } = store.getState();
        return authentication.refreshToken || '';
    };

    const clearToken = () => {
        store.dispatch(setUserInfo({}));
    };

    return { setAllNewToken, getToken, getRefreshToken, clearToken };
};

export default TokenProvider;
