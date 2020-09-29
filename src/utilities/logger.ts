/* eslint-disable no-console */
export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        console.log(msg, params);
    }
    if (__DEV__ && isWarning) {
        console.warn(msg, params);
    }
}

export function apiLogger(msg: string, color: string, params: any): void {
    if (__DEV__) {
        console.log(msg, color, params);
    }
}
