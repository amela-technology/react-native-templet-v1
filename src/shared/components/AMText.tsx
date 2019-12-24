import * as React from "react"
import {
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
} from "react-native"
import {Themes} from "../../assets/themes"

interface AMTextProps extends TextProps {
    text: string
    customStyle?: StyleProp<TextStyle>
}

const AMText = (props: AMTextProps) => {
    return (
        <Text
            style={[styles.text, props.customStyle]}
            {...props}>
            {props.text}
        </Text>
    )
}
const styles = StyleSheet.create({
    text: {
        color: Themes.colors.textPrimary,
        fontSize: 12,
        fontFamily: Themes.fonts.defaultFont,
    },
})
export default AMText
