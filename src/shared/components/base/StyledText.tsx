import * as React from 'react'
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native'
import {Themes} from '../../../assets/themes'

interface StyledTextProps extends TextProps {
    text: string
    customStyle?: StyleProp<TextStyle>
}

const StyledText = (props: StyledTextProps) => {
    return (
        <Text style={[styles.text, props.customStyle]} {...props}>
            {props.text}
        </Text>
    )
}
const styles: any = StyleSheet.create({
    text: {
        color: Themes.colors.textPrimary,
        fontSize: 12,
        fontFamily: Themes.fonts.defaultFont,
    },
})
export default StyledText
