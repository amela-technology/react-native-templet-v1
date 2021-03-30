import Metrics from 'assets/metrics';
import modal from 'components/base/modal/ModalManager';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { handleUpdateModalList } from 'utilities/helper';
import ModalContent3 from './ModalContent3';

interface ModalContentProps {
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal?(): void;
}

const ModalContent2 = (props: ModalContentProps) => {
    return (
        <View style={styles.contModalContent} onLayout={handleUpdateModalList}>
            <Button
                title={'Modal'}
                onPress={() => {
                    modal.show?.({
                        children: <ModalContent3 closeModal={() => modal.dismiss?.()} />,
                        isFromBottom: true,
                        onBackdropPress: () => {
                            modal.dismiss?.();
                        },
                    });
                }}
            />
            <Button title={'hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent2;

const styles = StyleSheet.create({
    contModalContent: {
        width: Metrics.screenWidth * 0.6,
        height: Metrics.screenHeight,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
