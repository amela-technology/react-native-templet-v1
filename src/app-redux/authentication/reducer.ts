import { SIGN_IN, AuthenticationTypes, SIGN_OUT, RESTORE_TOKEN } from './types'

export interface AuthenticationData {
    userToken?: string
    refreshToken?: string
    user_id?: number
}

const initialState: AuthenticationData = {
    userToken: undefined,
    refreshToken: undefined,
    user_id: undefined,
}

const authentication = (state = initialState, action: AuthenticationTypes): AuthenticationData => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                userToken: action.token,
                refreshToken: action.refreshToken,
                user_id: action.user_id,
            }
        case SIGN_OUT:
            return {
                ...state,
                userToken: undefined,
                refreshToken: undefined,
                user_id: undefined,
            }
        case RESTORE_TOKEN:
            return {
                ...state,
                userToken: action.restore_token,
                refreshToken: action.restore_refreshToken,
            }
        default:
            return state
    }
}

export default authentication
