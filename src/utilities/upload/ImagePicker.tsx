/* eslint-disable no-nested-ternary */
import { StyledImage, StyledTouchable } from 'components/base';
import React, { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { logger } from 'utilities/logger';
import ImageUploader from './ImageUploader';

interface ImagePickerProp {
    setImage: any;
    image: any;
    children: any;
    customStyleImage?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<ViewStyle>;
}

const ImagePicker = (props: ImagePickerProp) => {
    const { image, setImage, children } = props;
    const { t } = useTranslation();

    const actionSheet = useRef<any>(null);
    const [loading, setLoading] = useState(false);

    const options = [t('authen.register.cancel'), t('authen.register.photo'), t('authen.register.camera')];
    const showActionSheet = () => {
        actionSheet?.current?.show();
    };

    const pickMainImage = async (index: number) => {
        try {
            setLoading(true);
            const uri = await ImageUploader.pickImage(index);
            setImage(uri || image);
        } catch (err) {
            logger('err', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <StyledTouchable customStyle={props.customStyle} onPress={showActionSheet}>
                {image && !loading ? (
                    <StyledImage customStyle={props.customStyleImage} source={{ uri: image }} />
                ) : loading ? (
                    <View style={[props.customStyleImage, styles.loading]}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View>{children}</View>
                )}
            </StyledTouchable>
            <ActionSheet
                ref={actionSheet}
                options={options}
                cancelButtonIndex={0}
                onPress={(index: any) => {
                    if (index !== 0) {
                        pickMainImage(index);
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default memo(ImagePicker);
