/* eslint-disable no-nested-ternary */
import Metrics from 'assets/metrics';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import ModalManager from './ModalManager';

const ModalComponent = ({ children, onBackdropPressed, isFromBottom, modalId }: any) => {
    const modalRedux = useSelector((state: any) => state?.modalRedux);
    const paramHeight = modalRedux.list[modalId]?.height;
    const paramWidth = modalRedux.list[modalId]?.width;
    const paramEndValue = paramHeight ? (isFromBottom ? (Metrics.screenHeight - paramHeight) / paramHeight : 0) : 0;
    const startValue = new Animated.Value(Metrics.screenHeight);
    const endValue = new Animated.Value(paramEndValue);
    const duration = 200;
    Animated.timing(startValue, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
    }).start();

    return (
        <View style={styles.contLayoutAndModal}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onBackdropPressed(onBackdropPressed)}
                style={styles.contBlurLayout}
            />
            <Animated.View
                style={[
                    {
                        transform:
                            (modalRedux.list[modalId] && modalId < Number(ModalManager.currentModal()?.id)) ||
                            (!modalRedux.actionOpening && modalId <= Number(ModalManager.currentModal()?.id))
                                ? []
                                : [{ translateY: startValue }],
                        alignSelf: 'center',
                        position: isFromBottom ? 'absolute' : 'relative',
                        bottom: isFromBottom ? 0 : undefined,
                    },
                ]}
            >
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    contLayoutAndModal: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    contBlurLayout: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default ModalComponent;
