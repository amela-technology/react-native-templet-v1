// models
export interface User {
    id: number;
    name: string;
    email: string;
}

// Action name
export const SET_USER_INFO = '@AUTHENTICATION/SET_USER_INFO';
export const CLEAR_USER_INFO = '@AUTHENTICATION/CLEAR_USER_INFO';
export const RESTORE_TOKEN = '@AUTHENTICATION/RESTORE_TOKEN';

// Action interface
interface SetUserInfoAction {
    type: typeof SET_USER_INFO;
    token: string;
    refreshToken: string;
    user: User;
}

interface SignOutAction {
    type: typeof CLEAR_USER_INFO;
}

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN;
    restoreToken: string;
    restoreRefreshToken: string;
}

export type AuthenticationTypes = SetUserInfoAction | SignOutAction | RestoreTokenAction;
