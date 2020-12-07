import { LOG_OUT, SET_USER_INFO, UserInfoTypes, UserInfoData } from './types';

const initialState: UserInfoData = {
    token: undefined,
    refreshToken: undefined,
    user: undefined,
};

const authentication = (state = initialState, action: UserInfoTypes): UserInfoData => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                ...action.data,
            };
        case LOG_OUT:
            return {
                token: undefined,
                refreshToken: undefined,
                user: undefined,
            };
        default:
            return state;
    }
};

export default authentication;
