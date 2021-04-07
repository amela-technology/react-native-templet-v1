/* eslint-disable @typescript-eslint/no-unused-vars */
import { notificationRead } from 'api/modules/api-app/notification';
import { store } from 'app-redux/store';
import { useEffect } from 'react';
import Config from 'react-native-config';
import OneSignal, { NotificationReceivedEvent } from 'react-native-onesignal';
import { isLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';

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
        try {
            OneSignal.setAppId(Config.ONE_SIGNAL_APP_ID);
            // kOSSettingsKeyAutoPrompt is deprecated. If you omitted this previously or set it to true, you will now need to prompt the user by calling
            OneSignal.promptForPushNotificationsWithUserResponse();
            // registerForPushNotifications(): This is achieved by existing function promptForPushNotificationsWithUserResponse().
            // OneSignal.registerForPushNotifications();

            // inFocusDisplaying(): This was most likely set to 2 which means no additional changes need as this is the default in 4.x. Simply remove the function call.
            // OneSignal.inFocusDisplaying(2); // show notification

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
        return () => {
            OneSignal.clearHandlers();
        };
    }, []);
};
