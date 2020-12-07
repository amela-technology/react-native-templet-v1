import * as React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

interface StyledInputProps extends TextInputProps {
    customStyle?: StyleProp<TextStyle>;
    placeholder?: string;
    placeholderTextColor?: string;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const input = React.useRef<TextInput>(null);

    return (
        <TextInput
            ref={ref || input}
            style={[styles.textInput, props.customStyle]}
            placeholderTextColor={props.placeholderTextColor || 'black'}
            placeholder={props.placeholder}
            underlineColorAndroid="transparent"
            {...props}
        />
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
