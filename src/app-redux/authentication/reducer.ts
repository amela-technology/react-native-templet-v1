import { SIGN_IN, AuthenticationTypes, SIGN_OUT, RESTORE_TOKEN } from './types';

export interface AuthenticationData {
    userToken?: string;
    refreshToken?: string;
    userId?: number;
}

const initialState: AuthenticationData = {
    userToken: undefined,
    refreshToken: undefined,
    userId: undefined,
};

const authentication = (state = initialState, action: AuthenticationTypes): AuthenticationData => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                userToken: action.token,
                refreshToken: action.refreshToken,
                userId: action.userId,
            };
        case SIGN_OUT:
            return {
                ...state,
                userToken: undefined,
                refreshToken: undefined,
                userId: undefined,
            };
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.restoreToken,
                refreshToken: action.restoreRefreshToken,
            };
        default:
            return state;
    }
};

export default authentication;
