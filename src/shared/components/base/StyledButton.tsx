import * as React from "react"
import {StyleProp, StyleSheet, Text, ViewStyle} from "react-native"
import {Themes} from "assets/themes"
import TouchableRipple from "./StyledTouchable"

interface StyledButtonProps {
    title: string
    customStyle?: StyleProp<ViewStyle>

    onPress(): void

    onLongPress?(): void
}

const StyledButton = (props: StyledButtonProps) => {
    return (
        <TouchableRipple customStyle={styles.container} onPress={props.onPress} onLongPress={props.onLongPress}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableRipple>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 42,
        width: 128,
        margin: 4,
        borderColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        color: Themes.COLORS.textPrimary,
    },
})
export default StyledButton
