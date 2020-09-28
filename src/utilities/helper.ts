import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        // eslint-disable-next-line no-console
        console.log(msg, params);
    }
    if (__DEV__ && isWarning) {
        // eslint-disable-next-line no-console
        console.warn(msg, params);
    }
}
