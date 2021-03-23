/* eslint-disable no-nested-ternary */
import Metrics from 'assets/metrics';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { logger } from 'utilities/helper';

const ModalComponent = ({ children, onBackdropPressed, isFromBottom, modalWrapperWidth, modalWrapperHeight }: any) => {
    const calculateLength = ({ length, type }: { length?: string | number; type: string }) => {
        if (length && typeof length === 'string') {
            if (!RegExp(/^\d+%$/g).test(length)) {
                logger('ModalWrapperWidth or ModalWrapperHeight must be formatted as XX%', true);
                return 0;
            }
            return ((type === 'height' ? Metrics.screenHeight : Metrics.screenWidth) * parseFloat(length)) / 100;
        }
        if (length && typeof length === 'number') {
            return length;
        }
        return 0;
    };
    const paramHeight = calculateLength({ length: modalWrapperHeight, type: 'height' });
    const paramWidth = calculateLength({ length: modalWrapperWidth, type: 'width' });
    const paramEndValue = paramHeight ? (isFromBottom ? (Metrics.screenHeight - paramHeight) / 2 : 0) : 0;
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
                        transform: [{ translateY: startValue }],
                        width: paramWidth,
                        height: paramHeight,
                        alignSelf: paramWidth === Metrics.screenWidth ? undefined : 'center',
                        backgroundColor: 'pink', // To detect the wrapper and the content
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
