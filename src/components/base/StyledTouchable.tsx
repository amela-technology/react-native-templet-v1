/* eslint-disable no-console */
import React from 'react';
import { StyleProp, ViewStyle, Pressable, PressableProps } from 'react-native';

interface StyledTouchableProps extends PressableProps {
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
}

const StyledTouchable: React.FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style } = props;

    if (style) {
        // eslint-disable-next-line no-unused-expressions
        __DEV__ && console.warn('You should use customStyle to implement this component to avoid conflict');
    }

    return (
        <Pressable
            accessibilityTraits={'button'}
            disabled={disabled}
            android_disableSound={false}
            android_ripple={{ radius: 20 }}
            hitSlop={20}
            style={({ pressed }) => [
                {
                    // backgroundColor: pressed ? '#dbdbd9' : undefined,
                    // opacity: pressed ? 0.6 : 1,
                },
                customStyle,
            ]}
            {...props}
        >
            {children}
        </Pressable>
    );
};

export default StyledTouchable;
