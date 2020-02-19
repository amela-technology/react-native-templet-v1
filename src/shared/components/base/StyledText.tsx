import * as React from 'react'
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native'
import {Themes} from 'assets/themes'
import Size from 'assets/sizes'
import {useTranslation} from 'react-i18next'

interface StyledTextProps extends TextProps {
    text: string
    i18Params?: any
    customStyle?: StyleProp<TextStyle>
}

const StyledText = (props: StyledTextProps) => {
    const {t} = useTranslation()
    return (
        <Text style={[styles.text, props.customStyle]} {...props}>
            {t(props.text, props.i18Params)}
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
