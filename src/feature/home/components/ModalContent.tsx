import { StyledText } from 'components/base';
import StyledPicker from 'components/base/picker/StyledPicker';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface ModalContentProps {
    currentValue?: number;
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal?(): void;
}

const ModalContent = (props: ModalContentProps) => {
    const [currentValue, setCurrentValue] = useState(props?.currentValue || 0);
    const dataPicker = [
        'label1',
        'label2',
        'label3',
        'label4',
        'label5',
        'label6',
        'label7',
        'label8',
        'label9',
        'label10',
    ];
    const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    const handleConfirm = (item: string) => {
        setValuePicker(item);
    };

    return (
        <View style={styles.contModalContent}>
            <StyledText originValue={currentValue.toString()} />
            <Button
                title={'test alert'}
                onPress={() => {
                    props?.closeModal?.();
                    props?.handleCallback?.();
                }}
            />
            <StyledPicker currentValue={valuePicker} dataList={dataPicker} onConfirm={handleConfirm} />
            <Button
                title={'up and up'}
                onPress={() => {
                    setCurrentValue(currentValue + 1);
                    props?.handleSetValue?.(currentValue + 1);
                }}
            />
            <Button title={'hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent;

const styles = StyleSheet.create({
    contModalContent: {
        flex: 1, // Must have flex: 1 in here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
