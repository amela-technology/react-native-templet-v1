import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React, { useCallback } from 'react';
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { I18Type } from './StyledText';

export interface ICheckBox {
    value?: string;
    onConfirm?: (value: string) => void;
    content: I18Type;
    customStyle?: StyleProp<ViewStyle>;
    customContentStyle?: StyleProp<TextStyle>;
    customIconStyle?: StyleProp<ImageStyle>;
}

const CheckBox = (props: ICheckBox) => {
    const { value, onConfirm, content, customStyle, customContentStyle, customIconStyle } = props;

    const handleCheck = useCallback(() => {
        onConfirm?.(value ? '' : '1');
    }, [value]);

    return (
        <View style={[styles.container, customStyle]}>
            <StyledTouchable onPress={handleCheck} hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}>
                <StyledIcon
                    source={value ? Images.icons.checkBox.check : Images.icons.checkBox.uncheck}
                    size={20}
                    customStyle={[styles.icCheck, customIconStyle]}
                />
            </StyledTouchable>
            <StyledText i18nText={content} customStyle={[styles.content, customContentStyle]} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginLeft: '5@s',
    },
    icCheck: {
        tintColor: Themes.COLORS.grey,
    },
});

export default CheckBox;
