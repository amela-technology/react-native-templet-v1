import { SET_USER_INFO, AuthenticationTypes, CLEAR_USER_INFO, RESTORE_TOKEN, User } from './types';

export const setUserInfo = (token: string, refreshToken: string, user: User): AuthenticationTypes => ({
    type: SET_USER_INFO,
    token,
    refreshToken,
    user,
});

export const clearUserInfo = (): AuthenticationTypes => ({
    type: CLEAR_USER_INFO,
});

export const restoreToken = (restoreTokenStr: string, restoreRefreshToken: string): AuthenticationTypes => ({
    type: RESTORE_TOKEN,
    restoreToken: restoreTokenStr,
    restoreRefreshToken,
});
