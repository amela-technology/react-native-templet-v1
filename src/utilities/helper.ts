import { Platform } from 'react-native'

export const isAndroid = Platform.OS === 'android'

export const isIos = Platform.OS === 'ios'

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}
