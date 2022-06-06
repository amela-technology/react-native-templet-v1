import Images from 'assets/images';
import React, { memo, useEffect, useState } from 'react';
import { ImageProps, Image, StyleProp, ImageStyle } from 'react-native';

interface Props extends ImageProps {
    customStyle?: StyleProp<ImageStyle>;
}

const StyledImage = (props: Props) => {
    const { customStyle, source } = props;
    const { defaultImage } = Images.photo;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [source]);

    return (
        <Image {...props} style={customStyle} onError={() => setError(true)} source={error ? defaultImage : source} />
    );
};

export default memo(StyledImage);
