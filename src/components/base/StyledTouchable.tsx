import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle, Pressable, PressableProps } from 'react-native';
import { logger } from 'utilities/helper';
import { throttle } from 'lodash';

interface StyledTouchableProps extends PressableProps {
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
    throttleTime?: number;
}

const configThrottle = { trailing: false };
const onPressDefault = () => null;

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style, throttleTime = 500, onPress = onPressDefault } = props;

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    const handlePress = throttle(onPress, throttleTime, configThrottle);

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
            onPress={handlePress}
        >
            {children}
        </Pressable>
    );
};

export default StyledTouchable;
