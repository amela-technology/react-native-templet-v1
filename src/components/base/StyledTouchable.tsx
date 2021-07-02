import React, { FunctionComponent } from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { logger } from 'utilities/helper';

interface StyledTouchableProps extends TouchableOpacityProps {
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?(): void;
    onPressIn?(): void;
    onPressOut?(): void;
    onLongPress?(): void;
    children?: any;
}

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (props: StyledTouchableProps) => {
    const { customStyle, disabled, children, style } = props;

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    return (
        <TouchableOpacity disabled={disabled} style={customStyle} {...props}>
            {children}
        </TouchableOpacity>
    );
};

export default StyledTouchable;
