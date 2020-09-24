import { SIGN_IN, AuthenticationTypes, SIGN_OUT, RESTORE_TOKEN } from './types';

export const signIn = (token: string, refreshToken: string, userId: number): AuthenticationTypes => ({
    type: SIGN_IN,
    token,
    refreshToken,
    userId,
});

export const signOut = (): AuthenticationTypes => ({
    type: SIGN_OUT,
});

export const restoreToken = (restoreTokenStr: string, restoreRefreshToken: string): AuthenticationTypes => ({
    type: RESTORE_TOKEN,
    restoreToken: restoreTokenStr,
    restoreRefreshToken,
});
