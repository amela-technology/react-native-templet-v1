// Action name
export const SIGN_IN = '@AUTHENTICATION/SIGN_IN';
export const SIGN_OUT = '@AUTHENTICATION/SIGN_OUT';
export const RESTORE_TOKEN = '@AUTHENTICATION/RESTORE_TOKEN';

// Action interface
interface SignInAction {
    type: typeof SIGN_IN;
    token: string;
    refreshToken: string;
    userId: number;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN;
    restoreToken: string;
    restoreRefreshToken: string;
}

export type AuthenticationTypes = SignInAction | SignOutAction | RestoreTokenAction;
