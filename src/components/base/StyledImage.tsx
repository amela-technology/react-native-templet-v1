import React, { memo } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface StyledImageProps extends FastImageProps {
    customStyle?: any;
}

const StyledImage = (props: StyledImageProps) => {
    const { customStyle, resizeMode } = props;
    return <FastImage style={customStyle} resizeMode={resizeMode} {...props} />;
};

export default memo(StyledImage);
