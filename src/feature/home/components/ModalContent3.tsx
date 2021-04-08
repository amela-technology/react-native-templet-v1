import Metrics from 'assets/metrics';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { handleUpdateModalList } from 'utilities/helper';

interface ModalContentProps {
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal?(): void;
}

const ModalContent3 = (props: ModalContentProps) => {
    return (
        <View style={styles.contModalContent} onLayout={handleUpdateModalList}>
            <Button title={'hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent3;

const styles = StyleSheet.create({
    contModalContent: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.7,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
