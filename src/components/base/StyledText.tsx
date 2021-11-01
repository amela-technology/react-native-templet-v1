import * as React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { Themes } from 'assets/themes';
import Size from 'assets/sizes';
import { Normalize, useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { logger } from 'utilities/helper';
import { memo } from 'react';
import { Resource } from 'utilities/i18next';

interface StyledTextProps extends TextProps {
    customStyle?: StyleProp<TextStyle>;
    i18nParams?: any;
}

interface StyledTextWithOriginValue extends StyledTextProps {
    originValue: string;
    i18nText?: never;
}

interface StyledTextWithI18nValue extends StyledTextProps {
    originValue?: never;
    i18nText: Normalize<Resource>;
}

type StyledTextCombineProps = StyledTextWithOriginValue | StyledTextWithI18nValue;

const StyledText = (props: StyledTextCombineProps) => {
    const { t } = useTranslation();
    const { style, originValue, i18nText, i18nParams } = props;
    let value;

    if (style) {
        logger('StyledText should use customStyle to avoid override default style text', true);
    }

    if (originValue) {
        value = originValue;
    } else if (i18nText || i18next.exists(i18nText || '', i18nParams)) {
        value = t(i18nText as Normalize<Resource>, i18nParams);
    } else {
        value = i18nText || '';
    }

    return (
        <Text style={[styles.text, props.customStyle]} {...props}>
            {value}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Themes.COLORS.textPrimary,
        fontSize: Size.FONTSIZE.normal,
        // fontFamily: Themes.fonts.defaultFont,
    },
});

export default memo(StyledText);
