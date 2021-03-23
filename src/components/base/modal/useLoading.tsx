import { Themes } from 'assets/themes';
import * as React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import RootSiblingsManager from 'react-native-root-siblings';
import { wait } from 'utilities/helper';
import { StyledText, StyledTouchable } from '..';
import DialogComponent from './DialogComponent';

const useLoading = () => {
    let loadingModal: RootSiblingsManager | undefined;

    const show = (callback?: () => void, closeCallback?: () => void, props?: any) => {
        loadingModal = new RootSiblingsManager(
            (
                <DialogComponent
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    style={styles.dialogStyle}
                    isVisible={true}
                    {...props}
                >
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />
                        <StyledTouchable
                            onPress={() => {
                                dismiss(closeCallback);
                            }}
                            customStyle={{ marginTop: 10 }}
                        >
                            <StyledText originValue={'Cancel'} customStyle={{ fontSize: 16 }} />
                        </StyledTouchable>
                    </View>
                </DialogComponent>
            ),
            callback,
        );
    };

    const dismiss = (callback?: () => void, props?: any) => {
        loadingModal?.update(
            <DialogComponent
                animationIn="fadeIn"
                animationOut="fadeOut"
                style={styles.dialogStyle}
                isVisible={false}
                {...props}
            >
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                    <StyledTouchable
                        onPress={() => {
                            dismiss();
                        }}
                        customStyle={{ marginTop: 10 }}
                    >
                        <StyledText originValue={'Cancel'} customStyle={{ fontSize: 16 }} />
                    </StyledTouchable>
                </View>
            </DialogComponent>,
            () => {
                wait(500).then(() => {
                    if (loadingModal) destroy(callback);
                });
            },
        );
    };

    const destroy = (callback?: () => void) => {
        loadingModal?.destroy(() => {
            loadingModal = undefined;
            if (callback) callback();
        });
    };

    return { show, dismiss };
};

const styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: Themes.COLORS.white,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogStyle: {
        width: '30%',
        alignSelf: 'center',
    },
});

export default useLoading;
