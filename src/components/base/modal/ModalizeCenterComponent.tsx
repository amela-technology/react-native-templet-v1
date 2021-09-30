import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { StyledTouchable } from 'components/base';
import Metrics from 'assets/metrics';

interface Props {
    children: any;
    handleDismiss(): void;
    customContainerStyle?: StyleProp<ViewStyle>;
}

const ModalizeCenterComponent = (props: Props) => {
    const { children, handleDismiss, customContainerStyle = {} } = props;
    const [contentHeight, setContentHeight] = useState(0);
    const [lowerBackdropHeight, setLowerBackdropHeight] = useState(0);
    useEffect(() => {
        setLowerBackdropHeight((Metrics.screenHeight - contentHeight) / 2);
    }, [contentHeight]);

    return (
        <View style={[styles.container, customContainerStyle]}>
            <StyledTouchable onPress={handleDismiss} customStyle={{ height: lowerBackdropHeight }} />
            <View
                onLayout={(event) => {
                    setContentHeight(event?.nativeEvent?.layout?.height);
                }}
            >
                {children}
            </View>
            <StyledTouchable onPress={handleDismiss} customStyle={{ height: lowerBackdropHeight }} />
        </View>
    );
};

export default ModalizeCenterComponent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
});
