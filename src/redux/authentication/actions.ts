import { SIGN_IN, AuthenticationTypes, SIGN_OUT, RESTORE_TOKEN } from './types'

export const signIn = (token: string, refreshToken: string, user_id: number): AuthenticationTypes => ({
    type: SIGN_IN,
    token,
    refreshToken,
    user_id,
})

export const signOut = (): AuthenticationTypes => ({
    type: SIGN_OUT,
})

export const restoreToken = (restore_token: string, restore_refreshToken: string): AuthenticationTypes => ({
    type: RESTORE_TOKEN,
    restore_token,
    restore_refreshToken,
})
