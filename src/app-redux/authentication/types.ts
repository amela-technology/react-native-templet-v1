// models
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthenticationData {
    userToken?: string;
    refreshToken?: string;
    user?: User;
}

// Action name
export const SET_USER_INFO = '@AUTHENTICATION/SET_USER_INFO';

// Action interface
interface SetUserInfoAction {
    type: typeof SET_USER_INFO;
    data: AuthenticationData;
}

export type AuthenticationTypes = SetUserInfoAction;
