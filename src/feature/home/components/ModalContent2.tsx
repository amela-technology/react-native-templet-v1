import Metrics from 'assets/metrics';
import { StyledText, StyledButton } from 'components/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ModalContentProps {
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal(): void;
}

const ModalContent2 = (props: ModalContentProps) => {
    return (
        <View style={styles.contModalContent}>
            <StyledText i18nText={'This is 2nd modal!'} />
            <StyledButton title={'Hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent2;

const styles = StyleSheet.create({
    contModalContent: {
        height: Metrics.screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
