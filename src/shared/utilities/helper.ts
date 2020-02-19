import {Platform} from 'react-native'

export function isAndroid() {
    return Platform.OS === 'android'
}

export function isIos() {
    return Platform.OS === 'ios'
}
