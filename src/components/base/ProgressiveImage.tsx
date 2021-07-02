import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Animated, Image, ImageProps, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { staticValue } from 'utilities/staticData';

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
});

interface ProgressiveImageProps extends ImageProps {
    thumbSource?: ImageSourcePropType;
}

const ProgressiveImage: FunctionComponent<ProgressiveImageProps> = (props: ProgressiveImageProps) => {
    const { defaultImage } = Images.photo;
    const { thumbSource = defaultImage, source = defaultImage, style } = props;
    const [thumbnailAnimated] = useState(new Animated.Value(0));
    const [imageAnimated] = useState(new Animated.Value(0));
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [source]);

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true,
            duration: staticValue.TIME_IMAGE_LOAD,
        }).start();
    };

    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
            duration: staticValue.TIME_IMAGE_LOAD,
        }).start();
    };

    if (error) {
        return <Image {...props} source={defaultImage} style={[style]} />;
    }

    return (
        <View style={[style, { backgroundColor: Themes.COLORS.placeHolderGray }]}>
            <Animated.Image
                {...props}
                source={thumbSource}
                style={[style, { opacity: thumbnailAnimated }]}
                onLoad={handleThumbnailLoad}
                blurRadius={1}
            />
            <Animated.Image
                {...props}
                source={source}
                onError={() => setError(true)}
                style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                onLoad={onImageLoad}
            />
        </View>
    );
};

export default ProgressiveImage;
