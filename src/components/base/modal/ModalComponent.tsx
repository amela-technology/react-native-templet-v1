import Metrics from 'assets/metrics';
import React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';

const ModalComponent = ({ children, onBackdropPressed }: any) => {
    const startValue = new Animated.Value(Metrics.screenHeight);
    const endValue = new Animated.Value(Metrics.screenHeight * 0.3);
    const duration = 200;
    Animated.timing(startValue, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
    }).start();

    return (
        <View style={styles.contWrapper}>
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
                ]}
            >
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    contWrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
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
