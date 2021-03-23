import { Themes } from 'assets/themes';
import * as React from 'react';
import { Animated, Image, ImageProps, ImageSourcePropType, StyleSheet, View } from 'react-native';

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

const ProgressiveImage: React.FunctionComponent<ProgressiveImageProps> = (props: ProgressiveImageProps) => {
    const DEFAULT_IMAGE = { uri: 'https://medifactia.com/wp-content/uploads/2018/01/placeholder.png' };
    const { thumbSource = DEFAULT_IMAGE, source, style } = props;
    const [thumbnailAnimated] = React.useState(new Animated.Value(0));
    const [imageAnimated] = React.useState(new Animated.Value(0));
    const [error, setError] = React.useState<boolean>(false);
    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    if (error) {
        return <Image {...props} source={DEFAULT_IMAGE} style={[style]} />;
    }

    return (
        <View style={[style, { backgroundColor: Themes.COLORS.placeHolderGray }]}>
            <Animated.Image
                {...props}
                source={thumbSource}
                // onError={() => setError(true)}
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
