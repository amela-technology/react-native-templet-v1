import * as React from 'react'
import { StyleProp, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Themes } from 'assets/themes'
import TouchableRipple from './StyledTouchable'
import { StyledText } from '.'

interface StyledButtonProps {
    title: string
    customStyle?: StyleProp<ViewStyle>
    titleStyle?: StyleProp<TextStyle>
    iconStyle?: StyleProp<ViewStyle>
    i18Key?: any
    i18Params?: any

    onPress(): void

    onLongPress?(): void

    disabled?: boolean
}

const StyledButton = (props: StyledButtonProps) => {
    return (
        <TouchableRipple
            customStyle={styles.container}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            disabled={props.disabled}
        >
            <StyledText customStyle={[styles?.title, props.titleStyle]} i18Key={props.title} numberOfLines={1} />
        </TouchableRipple>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 42,
        width: 128,
        margin: 4,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        color: Themes.COLORS.textPrimary,
    },
})
export default StyledButton
