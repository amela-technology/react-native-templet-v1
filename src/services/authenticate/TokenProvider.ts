import AsyncStorage from "@react-native-community/async-storage"
const KEY_TOKEN = "TOKEN"
const KEY_REFRESH_TOKEN = "REFESH_TOKEN"
class TokenProvider {
    token: any
    refreshToken: any
    async setAllNewToken(token: string, refreshToken: string) {
        this.token = token
        this.refreshToken = refreshToken
        await AsyncStorage.setItem(KEY_TOKEN, token)
        await AsyncStorage.setItem(KEY_REFRESH_TOKEN, refreshToken)
        console.log("Got new token = " + token)
        console.log("Got new refreshToken = " + refreshToken)
    }
    async getToken(): Promise<string> {
        if (this.token) {
            return this.token
        }
        return (await AsyncStorage.getItem(KEY_TOKEN)) || ""
    }
    async getRefreshToken(): Promise<string> {
        if (this.refreshToken) {
            return this.refreshToken
        }
        return (await AsyncStorage.getItem(KEY_REFRESH_TOKEN)) || ""
    }
    async clearToken() {
        this.token = null
        this.refreshToken = null
        await AsyncStorage.removeItem(KEY_TOKEN)
        await AsyncStorage.removeItem(KEY_REFRESH_TOKEN)
    }
}
export default new TokenProvider()
