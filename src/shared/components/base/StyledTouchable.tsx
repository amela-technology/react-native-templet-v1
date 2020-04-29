import React, { ReactNode } from 'react'
import { StyleProp, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from 'react-native'
import { isAndroid } from '../../utilities/helper'

interface StyledTouchableProps {
    customStyle?: StyleProp<ViewStyle>

    disabled?: boolean

    children?: ReactNode

    onPress?(): void

    onPressIn?(): void

    onPressOut?(): void

    onLongPress?(): void
}

const DEFAULT_OPACITY = 0.5

const StyledTouchable = (props: StyledTouchableProps) => {
    const handlePress = () => {
        props.onPress && props.onPress()
    }

    const handlePressIn = () => {
        props.onPressIn && props.onPressIn()
    }

    const handlePressOut = () => {
        props.onPressOut && props.onPressOut()
    }

    const handleLongPress = () => {
        props.onLongPress && props.onLongPress()
    }

    const renderAndroidButton = () => {
        const { customStyle, disabled, children } = props
        return (
            <TouchableNativeFeedback
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={handleLongPress}
                accessibilityTraits={'button'}
                disabled={disabled}
            >
                <View style={customStyle}>{children}</View>
            </TouchableNativeFeedback>
        )
    }

    const renderIosButton = () => {
        const { customStyle, disabled, children } = props
        return (
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onLongPress={handleLongPress}
                accessibilityTraits={'button'}
                activeOpacity={DEFAULT_OPACITY}
                disabled={disabled}
                {...props}
            >
                <View style={customStyle}>{children}</View>
            </TouchableOpacity>
        )
    }

    return isAndroid() ? renderAndroidButton() : renderIosButton()
}

export default StyledTouchable
