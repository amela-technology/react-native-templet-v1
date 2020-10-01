import { SET_USER_INFO, AuthenticationTypes, CLEAR_USER_INFO, RESTORE_TOKEN, User } from './types';

export interface AuthenticationData {
    userToken?: string;
    refreshToken?: string;
    user?: User;
}

const initialState: AuthenticationData = {
    userToken: undefined,
    refreshToken: undefined,
    user: undefined,
};

const authentication = (state = initialState, action: AuthenticationTypes): AuthenticationData => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userToken: action.token,
                refreshToken: action.refreshToken,
                user: action.user,
            };
        case CLEAR_USER_INFO:
            return {
                ...state,
                userToken: undefined,
                refreshToken: undefined,
                user: undefined,
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
