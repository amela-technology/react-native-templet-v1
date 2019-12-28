import React, {ReactNode} from "react"
import {StyleProp, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle} from "react-native"
import {isAndroid} from "../../utilities/helper"

interface AMTouchableProps {
    customStyle?: StyleProp<ViewStyle>

    disabled?: boolean

    children?: ReactNode

    onPress?(): void

    onPressIn?(): void

    onPressOut?(): void

    onLongPress?(): void
}

const DEFAULT_OPACITY = 0.5

const AMTouchable = (props: AMTouchableProps) => {
    function handlePress() {
        props.onPress && props.onPress()
    }

    function handlePressIn() {
        props.onPressIn && props.onPressIn()
    }

    function handlePressOut() {
        props.onPressOut && props.onPressOut()
    }

    function handleLongPress() {
        props.onLongPress && props.onLongPress()
    }

    function renderAndroidButton() {
        const {customStyle, disabled, children} = props
        return (
            <TouchableNativeFeedback
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={handleLongPress}
                accessibilityTraits={"button"}
                disabled={disabled}>
                <View style={customStyle}>{children}</View>
            </TouchableNativeFeedback>
        )
    }

    function renderIosButton() {
        const {customStyle, disabled, children} = props
        return (
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={handleLongPress}
                accessibilityTraits={"button"}
                activeOpacity={DEFAULT_OPACITY}
                disabled={disabled}
                {...props}>
                <View style={customStyle}>{children}</View>
            </TouchableOpacity>
        )
    }

    return isAndroid() ? renderAndroidButton() : renderIosButton()
}

export default AMTouchable
