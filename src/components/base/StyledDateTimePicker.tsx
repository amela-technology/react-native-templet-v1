/* eslint-disable @typescript-eslint/ban-types */
import Images from 'assets/images';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSourcePropType, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal, {
    CancelButtonComponent,
    ConfirmButtonComponent,
    HeaderComponent,
    PickerComponent,
} from 'react-native-modal-datetime-picker';
import { StyledIcon } from '.';

interface DateTimePickerPropsCustom {
    cancelTextIOS?: string;
    confirmTextIOS?: string;
    customCancelButtonIOS?: CancelButtonComponent;
    customConfirmButtonIOS?: ConfirmButtonComponent;
    customHeaderIOS?: HeaderComponent;
    customPickerIOS?: PickerComponent;
    modalStyleIOS?: ViewStyle;
    pickerContainerStyleIOS?: ViewStyle;
    date?: Date;
    locale?: string;
    isDarkModeEnabled?: boolean;
    isVisible?: boolean;
    is24Hour?: boolean;
    mode?: 'date' | 'time' | 'datetime';
    modalPropsIOS?: Object;
    timePickerModeAndroid?: 'spinner' | 'clock' | 'default';
    headerTextIOS?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    minuteInterval?: number;
    timeZoneOffsetInMinutes?: number;
    onDateChange?(newDate: Date): void;
    onConfirm?(date: Date): void;
    onCancel?(date: Date): void;
    onHide?(date: Date): void;
    testID?: string;
}

interface IProps extends DateTimePickerPropsCustom {
    title?: string;
    chooseDateTime: Date;
    setChooseDateTime: any;
    customStyle?: StyleProp<ViewStyle>;
    iconDateTimeSource?: ImageSourcePropType;
    titleStyle?: StyleProp<TextStyle>;
    onConfirm?: any;
    onCancel?: any;
    formatDate?: string;
}

const StyledDateTimePicker = (props: IProps) => {
    const {
        mode,
        chooseDateTime,
        setChooseDateTime,
        customStyle,
        iconDateTimeSource,
        titleStyle,
        onConfirm,
        onCancel,
        formatDate,
    } = props;
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const { t } = useTranslation();
    const hideDatePicker = () => {
        setIsPickerVisible(false);
    };
    const handleConfirm = (value: Date) => {
        onConfirm?.();
        setChooseDateTime(value);
        hideDatePicker();
    };
    const togglePicker = () => {
        setIsPickerVisible(!isPickerVisible);
    };

    const renderFormat = () => {
        if (formatDate) return formatDate;
        let formatPicker = 'YYYY/MM/DD';
        switch (mode) {
            case 'date':
                formatPicker = 'YYYY/MM/DD';
                break;
            case 'time':
                formatPicker = 'HH:mm';
                break;
            default:
                formatPicker = 'YYYY/MM/DD HH:mm';
                break;
        }
        return formatPicker;
    };

    const getFormatDate = () => {
        return dayjs(chooseDateTime).format(renderFormat());
    };

    const cancelPicker = () => {
        onCancel?.();
        togglePicker();
    };

    return (
        <View>
            <TouchableOpacity onPress={togglePicker} style={[styles.buttonPicker, customStyle]}>
                <Text style={[titleStyle, { color: 'black' }]}>{getFormatDate()}</Text>
                <StyledIcon source={iconDateTimeSource || Images.icons.dateTime} size={15} />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                date={chooseDateTime || new Date()}
                mode={mode || 'date'}
                headerTextIOS={t('dateTimePicker.pickADate')}
                confirmTextIOS={t('dateTimePicker.confirm')}
                cancelTextIOS={t('dateTimePicker.cancel')}
                {...props}
                onConfirm={handleConfirm}
                onCancel={cancelPicker}
            />
        </View>
    );
};

export default StyledDateTimePicker;

const styles = StyleSheet.create({
    buttonPicker: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
    },
});
