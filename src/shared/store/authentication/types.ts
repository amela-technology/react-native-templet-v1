// Action name
export const SIGN_IN = '@AUTHENTICATION/SIGN_IN'
export const SIGN_OUT = '@AUTHENTICATION/SIGN_OUT'
export const RESTORE_TOKEN = '@AUTHENTICATION/RESTORE_TOKEN'

// Action interface
interface SignInAction {
    type: typeof SIGN_IN
    token: string
    refreshToken: string
    user_id: number
}

interface SignOutAction {
    type: typeof SIGN_OUT
}

interface RestoreTokenAction {
    type: typeof RESTORE_TOKEN
    restore_token: string
    restore_refreshToken: string
}

export type AuthenticationTypes = SignInAction | SignOutAction | RestoreTokenAction
