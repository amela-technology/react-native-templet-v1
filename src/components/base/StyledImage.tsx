import Images from 'assets/images';
import React, { memo, useEffect, useState } from 'react';
import { ImageProps, Image } from 'react-native';

interface StyledImageProps extends ImageProps {
    customStyle?: any;
}

const StyledImage = (props: StyledImageProps) => {
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
