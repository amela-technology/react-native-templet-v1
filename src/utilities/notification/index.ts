import { notificationRead } from 'api/modules/api-app/notification';
import { store } from 'app-redux/store';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal, { OSNotification } from 'react-native-onesignal';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';

type NotificationReceivedEvent = {
    complete: (notification?: OSNotification) => void;
    getNotification: () => OSNotification;
};

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
        const { additionalData } = data?.notification;
        onMoveNavigation(additionalData);
    }
}

function onReceived(data: NotificationReceivedEvent) {
    logger('onReceived', undefined, data);
    const notify = data.getNotification();
    setTimeout(() => data.complete(notify), 0); // must need to show notify in tab bar
}

export const useOnesignal = (user?: any) => {
    if (!user) {
        const { userInfo } = store.getState();
        user = userInfo?.user;
    }

    useEffect(() => {
        setTimeout(() => {
            try {
                OneSignal.setAppId(Config.ONE_SIGNAL_APP_ID);
                // React Native OneSignal Ver4 Need pass function callback into function promptForPushNotificationsWithUserResponse to push notification in ios
                OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
                    logger('User Accept Push Notification IOS:', false, response);
                });
                if (isLogin()) {
                    pushTagMember(user?.id);
                } else {
                    deleteTagOneSignal();
                }
                OneSignal.setNotificationWillShowInForegroundHandler(onReceived);
                OneSignal.setNotificationOpenedHandler(handleNavigateNotification);
            } catch (error) {
                logger(error);
            }
        }, 200);
        return () => {
            OneSignal.clearHandlers();
        };
    }, []);
};
