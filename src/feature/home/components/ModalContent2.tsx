import { StyledText } from 'components/base';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface ModalContentProps {
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal?(): void;
}

const ModalContent2 = (props: ModalContentProps) => {
    return (
        <View style={styles.contModalContent}>
            <StyledText i18nText={'This is 2nd modal!'} />
            <Button title={'Hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent2;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        alignItems: 'center',
        justifyContent: 'center',
    },
});
