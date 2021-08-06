import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { logger } from 'utilities/helper';
import { throttle } from 'lodash';

interface StyledTouchableProps extends TouchableOpacityProps {
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
    children?: any;
    throttleTime?: number;
}

const configThrottle = { trailing: false };
const onPressDefault = () => null;

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style, throttleTime = 1000, onPress = onPressDefault } = props;

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    const handlePress = throttle(onPress, throttleTime, configThrottle);

    return (
        <TouchableOpacity activeOpacity={0.6} disabled={disabled} style={customStyle} {...props} onPress={handlePress}>
            {children}
        </TouchableOpacity>
    );
};

export default StyledTouchable;
