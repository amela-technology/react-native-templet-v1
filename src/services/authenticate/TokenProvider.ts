/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage'
import { store } from 'shared/store/store'
import { restoreToken } from 'shared/store/authentication/actions'
const KEY_TOKEN = 'TOKEN'
const KEY_REFRESH_TOKEN = 'REFRESH_TOKEN'
class TokenProvider {
    token?: string | null
    refreshToken?: string | null

    constructor(token?: string, refreshToken?: string) {
        this.token = token
        this.refreshToken = refreshToken
    }

    setAllNewToken(token: string, refreshToken: string) {
        __DEV__ && console.log('Got new token = ' + token)
        __DEV__ && console.log('Got new refreshToken = ' + refreshToken)
        store.dispatch(restoreToken(token, refreshToken))
    }

    getToken(): string {
        const { authentication } = store.getState()
        return authentication.userToken || ''
    }

    getRefreshToken(): string {
        const { authentication } = store.getState()
        return authentication.refreshToken || ''
    }

    async clearToken() {
        this.token = null
        this.refreshToken = null
        await AsyncStorage.removeItem(KEY_TOKEN)
        await AsyncStorage.removeItem(KEY_REFRESH_TOKEN)
    }
}
export default new TokenProvider()
