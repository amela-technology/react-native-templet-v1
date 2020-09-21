import * as React from 'react'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { Themes } from 'assets/themes'
import Size from 'assets/sizes'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

interface StyledTextProps extends TextProps {
    children: string
    i18Params?: any
    customStyle?: StyleProp<TextStyle>
}

const StyledText = (props: StyledTextProps) => {
    const { t } = useTranslation()
    return (
        <Text style={[styles.text, props.customStyle]} {...props}>
            {i18next.exists(props.children, props.i18Params) ? t(props.children, props.i18Params) : props.children}
        </Text>
    )
}
const styles: any = StyleSheet.create({
    text: {
        color: Themes.COLORS.textPrimary,
        fontSize: Size.FONTSIZE.normal,
        // fontFamily: Themes.fonts.defaultFont,
    },
})
export default React.memo(StyledText)
