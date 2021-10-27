import { Themes } from 'assets/themes';
import { StyledInput, StyledButton } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledPicker from 'components/base/picker/StyledPicker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { dataPicker } from 'utilities/staticData';
import ModalContent2 from './ModalContent2';

interface ModalContentProps {
    currentValue: any;
    handleCallback?(): void;
    handleSetValue(currentValue: any): void;
    handleIncreaseNumber?(): void;
    closeModal?(): void;
}

const ModalContent = (props: ModalContentProps) => {
    const { handleSetValue } = props;
    const modalize = ModalizeManager();
    const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    const handleConfirm = (item: string) => {
        setValuePicker(item);
    };

    return (
        <View style={styles.contModalContent}>
            <StyledInput onChangeText={handleSetValue} placeholder="Please fill in input..." />
            <StyledPicker
                currentValue={valuePicker}
                dataList={dataPicker}
                onConfirm={handleConfirm}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Test alert with closing modal'}
                onPress={() => {
                    props?.closeModal?.();
                    props?.handleCallback?.();
                }}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Test alert without closing modal'}
                onPress={() => {
                    props?.handleCallback?.();
                }}
                customStyle={{ width: '80%' }}
            />
            <StyledButton
                title={'Open Modal 2'}
                onPress={() => {
                    modalize.show('modalTest2', <ModalContent2 closeModal={() => modalize.dismiss('modalTest2')} />, {
                        modalStyle: {
                            backgroundColor: Themes.COLORS.white,
                        },
                        modalTopOffset: 0,
                        adjustToContentHeight: true,
                        disableScrollIfPossible: false,
                    });
                }}
            />
            <StyledButton title={'Hide'} onPress={() => props?.closeModal?.()} />
        </View>
    );
};

export default ModalContent;

const styles = StyleSheet.create({
    contModalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
});
