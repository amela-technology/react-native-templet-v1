import React, { useState } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
    ReturnKeyTypeOptions,
    ColorValue,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Size from 'assets/sizes';
import { Themes } from 'assets/themes';
import StyledText from './StyledText';

interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: string;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: string;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const input = React.useRef<TextInput>(null);
    const { t } = useTranslation();
    return (
        <View style={props.containerStyle}>
            <TextInput
                ref={ref || input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={[
                    styles.textInput,
                    props.customStyle,
                    !isFocused && props?.errorMessage && { borderColor: Themes.COLORS.borderInputError },
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
            {props?.errorMessage && !isFocused && (
                <StyledText i18nText={props.errorMessage} customStyle={styles.errorMessage} />
            )}
        </View>
    );
};
const styles: any = StyleSheet.create({
    textInput: {
        width: 250,
        margin: 4,
        padding: 2,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: 'black',
        borderRadius: 5,
    },
});
export default React.forwardRef(StyledInput);
