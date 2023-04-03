import Size from 'assets/sizes';
import { Themes } from 'assets/themes';
import i18next from 'i18next';
import * as React from 'react';
import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Normalize, useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { logger } from 'utilities/helper';
import { Resource } from 'utilities/i18next';

export type I18Type = Normalize<Resource>;
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
    i18nText: I18Type;
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
        value = t(i18nText as I18Type, i18nParams);
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

export default memo(StyledText, isEqual);
