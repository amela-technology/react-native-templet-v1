import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native';
import { scale } from 'react-native-size-matters';

interface Props extends ImageProps {
    size: number;
    customStyle?: StyleProp<ImageStyle>;
}

const StyledIcon = (props: Props) => {
    return (
        <Image
            style={[props.customStyle, { width: scale(props.size), height: scale(props.size) }]}
            resizeMode={'contain'}
            {...props}
        />
    );
};

export default memo(StyledIcon, isEqual);
