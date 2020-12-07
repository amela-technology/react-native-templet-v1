export interface UserInfoData {
    token?: string;
    refreshToken?: string;
    user?: any;
}

// Action name
export const SET_USER_INFO = '@AUTHENTICATION/SET_USER_INFO';
export const LOG_OUT = '@AUTHENTICATION/LOG_OUT';

// Action interface
interface SetUserInfoAction {
    type: typeof SET_USER_INFO;
    data: UserInfoData;
}

interface LogOutAction {
    type: typeof LOG_OUT;
}

export type UserInfoTypes = SetUserInfoAction | LogOutAction;
