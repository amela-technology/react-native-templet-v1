import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Picker from 'react-native-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { initPicker } from 'utilities/helper';
import { StyledImage, StyledText, StyledTouchable } from '..';
import ModalizeManager from '../modal/ModalizeManager';
import { I18Type } from '../StyledText';

const DEFAULT_HEIGHT = Metrics.screenHeight * 0.055;

export interface PickerProps {
    dataList: Array<any>;
    onConfirm?(item: string): void;
    label?: string;
    labelInput?: string;
    titleModalShowUp?: I18Type;
    currentValue?: any;
    customStyle?: StyleProp<ViewStyle>;
    pickerStyle?: StyleProp<ViewStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customLabelInputStyle?: StyleProp<TextStyle>;
    customPickerIconStyle?: any;
    isPickerDisable?: boolean;
    errorMessage?: string;
    customErrorStyle?: StyleProp<TextStyle>;
    value?: string;
}

const StyledPicker = (props: PickerProps) => {
    const { t } = useTranslation();
    const modalize = ModalizeManager();
    const [currentLabel, setCurrentLabel] = useState(props.label);
    const {
        dataList = [],
        errorMessage,
        customStyle,
        pickerStyle,
        customErrorStyle,
        currentValue,
        titleModalShowUp = 'common.picker.pickItem',
        isPickerDisable = false,
        customLabelInputStyle,
        labelInput, // label UI same StyledInput
        value, // value hook form, if dont use form, value is undefined
    } = props;
    const [item, setItem] = useState(currentValue || dataList[0]);

    useEffect(() => {
        if (typeof value === 'string') {
            // is picker in hook form
            handleConfirm([value], true);
        }
    }, [value]);

    const handleConfirm = (data: any, isForm = false) => {
        if (data[0]?.toString() === dataList.indexOf(item)?.toString()) {
            data.pop();
            data.push(dataList[0]);
        }
        setItem(data[0]?.toString());
        if (currentLabel) setCurrentLabel(undefined);
        Picker.select(data);
        if (!isForm) {
            props?.onConfirm?.(data[0]?.toString());
            modalize.dismiss('modalPickerBackdrop');
        }
    };

    const handleConfirmForm = (data: any) => {
        props?.onConfirm?.(data[0]?.toString());
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
                panGestureEnabled: false,
                withHandle: false,
                adjustToContentHeight: true,
                disableScrollIfPossible: false,
            },
        );
        const newData = [];
        initPicker({
            pickerData: dataList,
            pickerTitleText: t(titleModalShowUp),
            selectedValue: [dataList.indexOf(value || item)],
            onPickerConfirm: typeof value === 'string' ? handleConfirmForm : handleConfirm,
            onPickerCancel: handleCancel,
        });

        newData.push(value || item || dataList[0]);
        Picker.select(newData);
        Picker.show();
    };

    return (
        <View style={[customStyle]}>
            {!!labelInput && (
                <StyledText customStyle={[styles.labelInput, customLabelInputStyle]} i18nText={labelInput as I18Type} />
            )}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleShowPicker}
                style={[styles.contWholePicker, pickerStyle]}
                disabled={isPickerDisable}>
                <View style={styles.contTxtItem}>
                    <StyledText
                        originValue={currentLabel || item}
                        customStyle={[styles.txtItem, props.customLabelStyle]}
                    />
                </View>
                {isPickerDisable ? null : (
                    <StyledImage
                        source={Images.icons.selected}
                        style={[styles.imgPicker, props.customPickerIconStyle]}
                    />
                )}
            </TouchableOpacity>

            {!!errorMessage && (
                <StyledText i18nText={errorMessage as I18Type} customStyle={[styles.errorMessage, customErrorStyle]} />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    contWholePicker: {
        flexDirection: 'row',
        backgroundColor: '#E6E6E7',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        height: DEFAULT_HEIGHT,
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
    errorMessage: {
        fontSize: '12@ms',
        color: Themes.COLORS.borderInputError,
        marginLeft: '5@s',
        alignSelf: 'flex-start',
    },
    labelInput: {},
});

export default StyledPicker;
