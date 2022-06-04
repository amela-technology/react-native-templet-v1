import Images from 'assets/images';
import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate, YYYYMMDD } from 'utilities/format';
import StyledIcon from '../StyledIcon';
import StyledInput from '../StyledInput';

const StyledDateTimePicker = (props: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const { mode = 'date', value, onChangeText, dateTimeProps, ...inputProps } = props;

    const handleConfirmDate = (date: any) => {
        hideDatePicker();
        onChangeText?.(formatDate(date));
    };

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const renderRightIcon = () => {
        return <StyledIcon size={20} source={Images.icons.calendar} />;
    };

    return (
        <View>
            <DateTimePickerModal
                isVisible={isVisible}
                mode={mode}
                date={value ? new Date(value) : new Date()}
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                {...dateTimeProps}
            />
            <StyledInput
                value={value}
                editable={false}
                pointerEvents="none"
                placeholder={YYYYMMDD}
                renderRight={renderRightIcon}
                onPress={() => setIsVisible(true)}
                {...inputProps}
            />
        </View>
    );
};

export default StyledDateTimePicker;
