import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { store } from 'app-redux/store';
import { navigate } from 'navigation/NavigationService';
import { logger } from 'utilities/helper';
import { notificationRead } from 'api/modules/api-app/notification';

export const enumType = {
    System: 0,
    NewMessage: 1,
    MemberRequest: 2,
    StoreAccept: 3,
    Cancel: 4,
    MemberPaid: 5,
};

export function pushTagMember(id: number | string) {
    OneSignal.sendTag('memberId', `${id}`);
}

export function deleteTagOneSignal() {
    OneSignal.sendTag('memberId', '');
    OneSignal.deleteTag('memberId');
}

export async function onMoveNavigation(data: any) {
    if (data?.id) {
        try {
            await notificationRead(data.id);
            // Navigate
        } catch (error) {
            logger(error);
        }
    }
}
export function handleNavigateNotification(data: any) {
    if (isLogin()) {
        const payload = data?.notification?.payload?.additionalData;
        onMoveNavigation(payload);
    }
}

function onReceived() {
    logger('onReceived');
}

export const useOnesignal = (user?: any) => {
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }
    useEffect(() => {
        try {
            const iosSetting = {
                kOSSettingsKeyAutoPrompt: true,
            };
            OneSignal.init(Config.ONE_SIGNAL_APP_ID, iosSetting);
            OneSignal.inFocusDisplaying(2); // show notification
            OneSignal.registerForPushNotifications();
            if (isLogin()) {
                pushTagMember(user?.id);
            } else {
                deleteTagOneSignal();
            }
            OneSignal.addEventListener('received', onReceived);
            OneSignal.addEventListener('opened', handleNavigateNotification);
        } catch (error) {
            logger(error);
        }
        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', handleNavigateNotification);
        };
    }, []);
};
