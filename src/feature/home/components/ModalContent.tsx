import { StyledText } from 'components/base';
import useModal from 'components/base/modal/useModal';
import StyledPicker from 'components/base/picker/StyledPicker';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import ModalContent2 from './ModalContent2';

interface ModalContentProps {
    currentValue?: number;
    handleCallback?(): void;
    handleSetValue?(currentValue: number): void;
    closeModal?(): void;
}

const ModalContent = (props: ModalContentProps) => {
    const modal = useModal();
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
                title={'Increase number'}
                onPress={() => {
                    setCurrentValue(currentValue + 1);
                    props?.handleSetValue?.(currentValue + 1);
                }}
            />
            <Button
                title={'Test alert with closing modal'}
                onPress={() => {
                    props?.closeModal?.();
                    props?.handleCallback?.();
                }}
            />
            <Button
                title={'Test alert without closing modal'}
                onPress={() => {
                    props?.handleCallback?.();
                }}
            />
            <StyledPicker currentValue={valuePicker} dataList={dataPicker} onConfirm={handleConfirm} />
            <Button
                title={'Open Modal 2'}
                onPress={() => {
                    modal.show?.({
                        children: <ModalContent2 closeModal={() => modal.dismiss?.()} />,
                        modalWrapperHeight: '70%',
                        modalWrapperWidth: '100%',
                        onBackdropPress: () => {
                            modal.dismiss?.();
                        },
                    });
                }}
            />
            <Button title={'Hide'} onPress={() => props?.closeModal?.()} />
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
