/* eslint-disable consistent-return */
import i18next from 'i18next';
import { Alert } from 'react-native';
import { check, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { isIos, logger } from '../helper';

export const checkCamera = async () => {
    try {
        const checkPermission = await check(isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('camera');
        }
    } catch (err) {
        logger(err);
    }
};
export const checkPhoto = async () => {
    try {
        const checkPermission = await check(
            isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('photo');
        }
    } catch (err) {
        logger(err);
    }
};

const messages: any = {
    camera: i18next.t('permissions.camera'),
    photo: i18next.t('permissions.photo'),
};

const showRequestPermission = (type: string) => {
    Alert.alert(
        'Demo App',
        messages[type],
        [
            {
                text: i18next.t('alert.button.no'),
                onPress: () => logger('Cancel Pressed'),
                style: 'default',
            },
            {
                text: i18next.t('alert.button.yes'),
                onPress: () => openSettings().catch(() => console.warn('cannot open settings')),
            },
        ],
        { cancelable: false },
    );
};
