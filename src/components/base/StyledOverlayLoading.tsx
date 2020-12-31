import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Keyboard, ViewProps } from 'react-native';
import { Themes } from 'assets/themes';

interface Props extends ViewProps {
    visible: boolean;
    textContent?: boolean;
    onRequestClose?(): void;
    children?: React.FunctionComponent;
}

const StyledOverlayLoading = (props: Props) => {
    React.useEffect(() => {
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
            <View style={[styles.container]}>
                <View style={styles.background}>
                    <View style={styles.circle}>
                        <ActivityIndicator color={Themes.COLORS.black} size={42} style={[styles.activityIndicator]} />
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
});

export default React.memo(StyledOverlayLoading);
