import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Images from 'assets/images';
import Picker from 'react-native-picker';
import Metrics from 'assets/metrics';
import { useTranslation } from 'react-i18next';
import { initPicker } from 'utilities/helper';
import { StyledImage, StyledText, StyledTouchable } from '..';
import ModalizeManager from '../modal/ModalizeManager';

const DEFAULT_HEIGHT = Metrics.screenHeight * 0.055;

interface PickerProps {
    dataList: Array<any>;
    onConfirm(item: string): void;
    label?: string;
    titleModalShowUp?: string;
    currentValue?: any;
    customStyle?: StyleProp<ViewStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customPickerIconStyle?: any;
    isPickerDisable?: boolean;
}

const StyledPicker = (props: PickerProps) => {
    const [currentLabel, setCurrentLabel] = useState(props.label);
    const [item, setItem] = useState(props.currentValue || props.dataList[0]);
    const { t } = useTranslation();
    const modalize = ModalizeManager();

    const handleConfirm = (data: any) => {
        if (data[0]?.toString() === props.dataList.indexOf(item)?.toString()) {
            data.pop();
            data.push(props.dataList[0]);
        }
        setItem(data[0]?.toString());
        if (currentLabel) setCurrentLabel(undefined);
        Picker.select(data);
        props.onConfirm(data[0]?.toString());
        modalize.dismiss('modalPickerBackdrop');
    };

    const handleCancel = () => {
        modalize.dismiss('modalPickerBackdrop');
    };

    const handleShowPicker = () => {
        modalize.show(
            'modalPickerBackdrop',
            <StyledTouchable
                onPress={() => {
                    Picker.hide();
                    modalize.dismiss('modalPickerBackdrop');
                }}
                customStyle={{ height: Metrics.screenHeight }}
            />,
            {
                modalStyle: {
                    backgroundColor: 'transparent',
                    minHeight: '100%',
                },
                adjustToContentHeight: true,
                disableScrollIfPossible: false,
            },
        );
        const newData = [];
        initPicker({
            pickerData: props.dataList,
            pickerTitleText: props.titleModalShowUp || t('common.picker.pickItem'),
            selectedValue: [props.dataList.indexOf(item)],
            onPickerConfirm: handleConfirm,
            onPickerCancel: handleCancel,
        });

        newData.push(item || props.dataList[0]);
        Picker.select(newData);
        Picker.show();
    };
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleShowPicker}
                style={[styles.contWholePicker, props.customStyle]}
                disabled={props.isPickerDisable || false}
            >
                <View style={styles.contTxtItem}>
                    <StyledText
                        originValue={currentLabel || item}
                        customStyle={[styles.txtItem, props.customLabelStyle]}
                    />
                </View>
                {props.isPickerDisable ? null : (
                    <StyledImage
                        source={Images.icons.selected}
                        style={[styles.imgPicker, props.customPickerIconStyle]}
                    />
                )}
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    contWholePicker: {
        flexDirection: 'row',
        backgroundColor: '#E6E6E7',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        height: DEFAULT_HEIGHT,
        width: '90%',
    },
    contTxtItem: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtItem: {
        fontWeight: 'bold',
        textAlign: 'center',
        left: 0,
    },
    imgPicker: {
        height: DEFAULT_HEIGHT,
        aspectRatio: 5 / 9,
        right: 0,
    },
    wrapperViewModal: {
        flex: 1,
    },
});

export default StyledPicker;
