import * as React from 'react'
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native'
import { useTranslation } from 'react-i18next'

interface StyledInputProps extends TextInputProps {
    customStyle?: StyleProp<TextStyle>
    // placeholder?: string
    i18ParamsPlaceHolder?: any
    i18KeyPlaceHolder?: any
    placeholderTextColor?: string
}

const StyledInput = (props: StyledInputProps) => {
    const input = React.useRef<TextInput>(null)
    const { t } = useTranslation()

    return (
        <TextInput
            ref={input}
            style={[styles.textInput, props.customStyle]}
            placeholderTextColor={props.placeholderTextColor || 'black'}
            placeholder={
                props.i18KeyPlaceHolder ? t(props.i18KeyPlaceHolder, props.i18ParamsPlaceHolder) : props.placeholder
            }
            underlineColorAndroid="transparent"
            {...props}
        />
    )
}
const styles: any = StyleSheet.create({
    textInput: {
        height: 32,
        width: 128,
        margin: 4,
        padding: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
})
export default StyledInput
