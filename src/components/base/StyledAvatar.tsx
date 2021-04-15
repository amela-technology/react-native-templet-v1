import { Themes } from 'assets/themes';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { getFirstName } from 'utilities/format';
import { StyledImage, StyledText } from '.';
import StyledTouchable from './StyledTouchable';

interface AvatarProps {
    customStyle?: StyleProp<ViewStyle>;
    size?: number;
    type?: string;
    name?: string;
    image?: any;
    onPress?(): void;
}
const StyledAvatar = (props: AvatarProps) => {
    const { customStyle, size = 80, name, image, type, onPress } = props;
    return (
        <StyledTouchable
            customStyle={[
                styles.container,
                customStyle,
                {
                    width: verticalScale(size),
                    height: verticalScale(size),
                    borderRadius: type === 'square' ? 0 : verticalScale(size / 2),
                },
            ]}
            onPress={onPress}
        >
            {name && (
                <StyledText i18nText={getFirstName(name) || ''} customStyle={[styles.name, { fontSize: size / 5 }]} />
            )}
            {image && (
                <StyledImage
                    source={{ uri: image }}
                    customStyle={[
                        styles.avatar,
                        {
                            width: verticalScale(size),
                            height: verticalScale(size),
                            borderRadius: type === 'square' ? 0 : verticalScale(size / 2),
                        },
                    ]}
                />
            )}
        </StyledTouchable>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.placeHolderGray,
        justifyContent: 'center',
        height: 'center',
        alignItems: 'center',
    },
    avatar: {},
    name: {
        color: Themes.COLORS.black,
        fontWeight: 'bold',
    },
});

export default StyledAvatar;
