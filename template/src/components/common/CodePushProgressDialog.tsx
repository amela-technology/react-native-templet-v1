/* eslint-disable no-shadow */
/* eslint-disable default-case */
import { Platform, Text, View, StyleSheet, InteractionManager } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import ProgressBar from 'react-native-progress/Bar';
import i18next from 'utilities/i18next';
import RNRestart from 'react-native-restart';
import { Themes } from 'assets/themes';

const codePushKey =
    Platform.OS === 'ios' ? Config.CODEPUSH_IOS_DEVELOPMENT_KEY : Config.CODEPUSH_ANDROID_DEVELOPMENT_KEY;

const CodePushProgressDialog = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);

    const willMount = useRef(true);
    if (willMount.current) codePush.disallowRestart();
    willMount.current = false;

    useEffect(() => {
        InteractionManager.runAfterInteractions(checkForUpdate);
    }, []);

    useEffect(() => {
        return () => {
            codePush.allowRestart();
        };
    }, []);

    const syncCodepush = () => {
        codePush.sync(
            {
                updateDialog: {
                    title: i18next.t('syncUpdate.updateTitle'),
                    mandatoryUpdateMessage: i18next.t('syncUpdate.mandatoryUpdateMessage'),
                    mandatoryContinueButtonLabel: i18next.t('syncUpdate.continue'),
                    optionalUpdateMessage: i18next.t('syncUpdate.optionalUpdateMessage'),
                    optionalInstallButtonLabel: i18next.t('syncUpdate.install'),
                    optionalIgnoreButtonLabel: i18next.t('syncUpdate.ignore'),
                    appendReleaseDescription: true,
                    descriptionPrefix: '',
                },
                deploymentKey: codePushKey,
            },
            (status) => {
                switch (status) {
                    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                        setIsVisible(true);
                        setStatus(i18next.t('syncUpdate.downloadingPackage'));
                        break;
                    case codePush.SyncStatus.INSTALLING_UPDATE:
                        setStatus(i18next.t('syncUpdate.installingUpdate'));
                        break;
                    case codePush.SyncStatus.UP_TO_DATE:
                        setStatus(i18next.t('syncUpdate.upToDate'));
                        break;
                    case codePush.SyncStatus.UPDATE_INSTALLED:
                        setStatus(i18next.t('syncUpdate.updateInstalled'));
                        break;
                }
            },
            (progress) => {
                const currentProgress = +progress.receivedBytes / +progress.totalBytes;
                setProgress(currentProgress);
                if (currentProgress === 1) {
                    setTimeout(() => {
                        setIsVisible(false);
                        RNRestart.Restart();
                    }, 800);
                }
            },
        );
    };
    const checkForUpdate = () => {
        codePush.checkForUpdate(codePushKey).then((update) => update && syncCodepush());
    };

    return (
        <Modal
            hasBackdrop
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropColor={Themes.COLORS.backdropModalUpdate}
            isVisible={isVisible}
        >
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.header}>
                    {i18next.t('syncUpdate.appUpdate')}
                </Text>
                <Text style={styles.statusText}>{status}</Text>
                <ProgressBar color={Themes.COLORS.progressUpdateColor} progress={progress} width={null} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingBottom: 25,
        paddingHorizontal: 20,
        paddingTop: 13,
        height: 150,
        backgroundColor: Themes.COLORS.backgroundModalUpdate,
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 23,
        color: Themes.COLORS.secondary,
    },
    statusText: {
        marginBottom: 30,
        color: Themes.COLORS.secondary,
    },
});

export default CodePushProgressDialog;
