/* eslint-disable no-nested-ternary */
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, PanResponder } from 'react-native';
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

    const viewRef = useRef();
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const deltaMoveY = gestureState.dy > 0 ? gestureState.moveY : gestureState.y0;
            (viewRef?.current as any).setNativeProps({
                top: deltaMoveY,
            });
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (evt.nativeEvent.pageY / Metrics.screenHeight > 0.7) onBackdropPressed();
            else {
                (viewRef?.current as any).setNativeProps({
                    top: Metrics.screenHeight - paramHeight,
                });
            }
        },
    });

    return (
        <View style={styles.contLayoutAndModal}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onBackdropPressed(onBackdropPressed)}
                style={styles.contBlurLayout}
            />
            <Animated.View
                ref={viewRef}
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
                {isFromBottom ? (
                    <View style={styles.contKnob} {...panResponder.panHandlers}>
                        <View style={styles.knob} />
                    </View>
                ) : null}
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
    contKnob: {
        width: Metrics.screenWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    knob: {
        height: 8,
        width: 35,
        borderRadius: 4,
        backgroundColor: Themes.COLORS.placeHolderGray,
    },
});

export default ModalComponent;
