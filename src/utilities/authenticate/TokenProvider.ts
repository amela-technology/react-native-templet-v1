import AsyncStorage from '@react-native-community/async-storage';
import { store } from 'app-redux/store';
import setUserInfo from 'app-redux/authentication/actions';
import { logger } from 'utilities/helper';

const TokenProvider = () => {
    const setAllNewToken = (token: string, refreshToken: string) => {
        const authenticationReducer = store.getState().authentication;
        logger(`Got new token = ${token}`);
        logger(`Got new refreshToken = ${refreshToken}`);
        store.dispatch(setUserInfo({ userToken: token, refreshToken, user: authenticationReducer?.user || undefined }));
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
        const authenticationReducer = store.getState().authentication;
        store.dispatch(
            setUserInfo({ userToken: '', refreshToken: '', user: authenticationReducer?.user || undefined }),
        );
    };

    return { setAllNewToken, getToken, getRefreshToken, clearToken };
};

export default TokenProvider;
