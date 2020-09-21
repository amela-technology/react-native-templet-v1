/* eslint-disable no-console */
import React from 'react'
import { StyleProp, ViewStyle, Pressable, PressableProps } from 'react-native'

interface StyledTouchableProps extends PressableProps {
    customStyle?: StyleProp<ViewStyle>
    disabled?: boolean
    onPress?(): void
    onPressIn?(): void
    onPressOut?(): void
    onLongPress?(): void
}

const StyledTouchable = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style } = props

    if (style) {
        __DEV__ && console.warn('You should use customStyle to implement this component to avoid conflict')
    }

    const handlePress = () => {
        props?.onPress?.()
    }

    const handlePressIn = () => {
        props?.onPressIn?.()
    }

    const handlePressOut = () => {
        props?.onPressOut?.()
    }

    const handleLongPress = () => {
        props?.onLongPress?.()
    }

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onLongPress={handleLongPress}
            accessibilityTraits={'button'}
            disabled={disabled}
            android_disableSound={false}
            android_ripple={{ radius: 20 }}
            hitSlop={20}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#dbdbd9' : undefined,
                    opacity: pressed ? 0.6 : 1,
                },
                customStyle,
            ]}
            {...props}
        >
            {children}
        </Pressable>
    )
}

export default StyledTouchable
