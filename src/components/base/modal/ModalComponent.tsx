/* eslint-disable no-nested-ternary */
import Metrics from 'assets/metrics';
import React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';

const ModalComponent = ({ children, onBackdropPressed, isFromBottom }: any) => {
    const calculateLength = ({ length, type }: { length?: string | number; type: string }) => {
        if (length && typeof length === 'string') {
            return ((type === 'height' ? Metrics.screenHeight : Metrics.screenWidth) * parseFloat(length)) / 100;
        }
        if (type === 'height') return Metrics.screenHeight * 0.7;
        return Metrics.screenWidth;
    };
    const paramHeight = calculateLength({ length: children?.props?.style?.height, type: 'height' });
    const paramWidth = calculateLength({ length: children?.props?.style?.width, type: 'width' });
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
        <View style={[styles.contWrapper]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onBackdropPressed(onBackdropPressed)}
                style={styles.contBlurLayout}
            />
            <Animated.View
                style={[
                    {
                        transform: [{ translateY: startValue }],
                    },
                    {
                        width: paramWidth,
                        height: paramHeight,
                        alignSelf: paramWidth === Metrics.screenWidth ? undefined : 'center',
                    },
                ]}
            >
                {React.cloneElement(children, {
                    style: {
                        ...children?.props?.style,
                        width: '100%',
                        height: '100%',
                    },
                })}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    contWrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    contBlurLayout: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default ModalComponent;
