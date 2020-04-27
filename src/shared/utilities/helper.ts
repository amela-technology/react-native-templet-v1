import { Platform } from 'react-native'

export const isAndroid = () => {
    return Platform.OS === 'android'
}

export const isIos = () => {
    return Platform.OS === 'ios'
}
