import { Themes } from 'assets/themes';
import React, { useState, forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import StyledText from './StyledText';

export interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customErrorStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: string;
    label?: string;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const input = useRef<TextInput>(null);
    const { t } = useTranslation();
    return (
        <View style={[styles.container, props.containerStyle]}>
            {!!props.label && (
                <StyledText customStyle={[styles.label, props.customLabelStyle]} i18nText={props.label} />
            )}
            <TextInput
                ref={ref || input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={[
                    styles.textInput,
                    props.customStyle,
                    !isFocused && !!props?.errorMessage && { borderColor: Themes.COLORS.borderInputError },
                ]}
                placeholderTextColor={props.placeholderTextColor || Themes.COLORS.placeHolderGray}
                placeholder={props.customPlaceHolder ? t(props.customPlaceHolder) : ''}
                underlineColorAndroid={props.customUnderlineColor || 'transparent'}
                autoCompleteType="email"
                textContentType="emailAddress"
                importantForAutofill="yes"
                autoCorrect={false}
                returnKeyType={props.customReturnKeyType || 'next'}
                blurOnSubmit={!!props.customReturnKeyType}
                {...props}
            />
            {!!props?.errorMessage && !isFocused && (
                <StyledText i18nText={props.errorMessage} customStyle={[styles.errorMessage, props.customErrorStyle]} />
            )}
        </View>
    );
};
const styles: any = StyleSheet.create({
    textInput: {
        width: 250,
        padding: 2,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: 'black',
        borderRadius: 5,
    },
    errorMessage: {
        fontSize: 12,
        color: Themes.COLORS.borderInputError,
        marginTop: 5,
    },
    container: {
        marginBottom: 10,
    },
});
export default forwardRef(StyledInput);
