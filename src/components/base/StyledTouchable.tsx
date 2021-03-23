import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle, Pressable, PressableProps } from 'react-native';
import { logger } from 'utilities/helper';

interface StyledTouchableProps extends PressableProps {
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
}

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style } = props;

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    return (
        <Pressable
            accessibilityRole={'button'}
            disabled={disabled}
            android_disableSound={false}
            android_ripple={{ radius: 20 }}
            hitSlop={20}
            style={({ pressed }) => [
                {
                    // backgroundColor: pressed ? '#dbdbd9' : undefined,
                    opacity: pressed ? 0.6 : 1,
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
