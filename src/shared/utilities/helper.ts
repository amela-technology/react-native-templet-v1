import { Platform } from 'react-native'

export const isAndroid = () => {
    return Platform.OS === 'android'
}

export const isIos = Platform.OS === 'ios'

export function wait(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}
