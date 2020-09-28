import AsyncStorage from '@react-native-community/async-storage';
import { store } from 'app-redux/store';
import { restoreToken } from 'app-redux/authentication/actions';
import { logger } from 'utilities/helper';

const KEY_TOKEN = 'TOKEN';
const KEY_REFRESH_TOKEN = 'REFRESH_TOKEN';

const TokenProvider = () => {
    const setAllNewToken = (token: string, refreshToken: string) => {
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(restoreToken(token, refreshToken));
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
        store.dispatch(restoreToken('', ''));
    };

    return { setAllNewToken, getToken, getRefreshToken, clearToken };
};

export default TokenProvider;
