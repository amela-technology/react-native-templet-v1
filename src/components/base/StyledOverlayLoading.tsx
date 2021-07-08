import React, { FunctionComponent, memo, useEffect } from 'react';
import { StyleSheet, View, Modal, Keyboard, ViewProps, Image } from 'react-native';
import { Themes } from 'assets/themes';
import Images from 'assets/images';

interface Props extends ViewProps {
    visible: boolean;
    textContent?: boolean;
    onRequestClose?(): void;
    children?: FunctionComponent;
}

const StyledOverlayLoading = (props: Props) => {
    useEffect(() => {
        Keyboard.dismiss();
    }, [props.visible]);

    if (!props.visible) {
        return null;
    }

    const Spinner = () => {
        if (props.children) {
            return <View style={[styles.container]}>{props.children}</View>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={styles.circle}>
                        <Image source={Images.photo.loadingBuffering} style={styles.loading} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <Modal
            onRequestClose={props.onRequestClose}
            supportedOrientations={['portrait']}
            transparent
            visible={props.visible}
        >
            <Spinner />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.transparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    background: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    textContent: {
        top: 80,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
    },
    activityIndicator: {
        flex: 1,
    },
    loading: {
        width: 20,
        height: 20,
    },
});

export default memo(StyledOverlayLoading);
