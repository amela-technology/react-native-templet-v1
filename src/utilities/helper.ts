/* eslint-disable no-console */
import { updateModalList } from 'app-redux/modalRedux/actions';
import { store } from 'app-redux/store';
import i18next from 'i18next';
import { Platform } from 'react-native';
import Picker from 'react-native-picker';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export function wait(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function logger(msg: string, isWarning?: boolean, params?: any): void {
    if (__DEV__ && !isWarning) {
        if (params) console.log(msg, params);
        else console.log(msg);
    }
    if (__DEV__ && isWarning) {
        if (params) console.warn(msg, params);
        else console.warn(msg);
    }
}

export function initPicker(params?: any) {
    Picker.init({
        pickerTextEllipsisLen: 10,
        pickerCancelBtnText: i18next.t('common.cancel'),
        pickerConfirmBtnText: i18next.t('common.confirm'),
        ...params,
    });
}

export function handleUpdateModalList(event: any) {
    store.dispatch(
        updateModalList({
            width: event?.nativeEvent?.layout?.width,
            height: event?.nativeEvent?.layout?.height,
        }),
    );
}
