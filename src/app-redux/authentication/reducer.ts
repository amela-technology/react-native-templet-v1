import { SET_USER_INFO, AuthenticationTypes, AuthenticationData } from './types';

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
                ...action.data,
            };
        default:
            return state;
    }
};

export default authentication;
