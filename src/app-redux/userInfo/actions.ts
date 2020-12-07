import { SET_USER_INFO, UserInfoTypes, UserInfoData, LOG_OUT } from './types';

export const setUserInfo = (data: UserInfoData): UserInfoTypes => ({
    type: SET_USER_INFO,
    data,
});

export const logOutUser = (): UserInfoTypes => ({
    type: LOG_OUT,
});
