import Metrics from 'assets/metrics';
import { StyledText } from 'components/base';
import modal from 'components/base/modal/ModalManager';
import StyledPicker from 'components/base/picker/StyledPicker';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { handleUpdateModalList } from 'utilities/helper';
import ModalContent2 from './ModalContent2';

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
        <View style={styles.contModalContent} onLayout={handleUpdateModalList}>
            <TextInput style={{ height: 50, width: '100%' }} />
            <StyledText originValue={currentValue.toString()} />
            <Button
                title={'test alert'}
                onPress={() => {
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
            <Button
                title={'Modal'}
                onPress={() => {
                    modal.show?.({
                        children: <ModalContent2 closeModal={() => modal.dismiss?.()} />,
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

export default ModalContent;

const styles = StyleSheet.create({
    contModalContent: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.7,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
