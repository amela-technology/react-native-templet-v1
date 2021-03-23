import { useNavigation } from '@react-navigation/native';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import React, { FunctionComponent, memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { ImageStyle, ImageURISource, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

const useComponentSize = () => {
    const [size, setSize] = useState<any>({
        width: undefined,
        height: undefined,
    });

    const onLayout = useCallback((event) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, []);
    return [size, onLayout];
};

interface StyledHeaderLeadingProps {
    canGoBack?: boolean;
    customLeading?: ReactNode;
    onPressLeading?: () => void;
    backIcon?: ImageURISource;
    backIconCustomStyle?: StyleProp<ImageStyle>;
    backText?: string;
    backTextCustomStyle?: StyleProp<TextStyle>;
    defaultWidthLeading?: number;
}

const StyledHeaderLeading = (props: StyledHeaderLeadingProps) => {
    if (props.customLeading) {
        const Leading: FunctionComponent = props.customLeading as FunctionComponent;
        return <Leading />;
    }
    if (props.canGoBack) {
        return (
            <StyledTouchable customStyle={styles.leadingCanGoBack} onPress={props.onPressLeading}>
                <StyledIcon
                    source={props.backIcon || Images.icons.back}
                    size={35}
                    customStyle={props.backIconCustomStyle || { tintColor: Themes.COLORS.white }}
                />
                <StyledText
                    customStyle={props.backTextCustomStyle || { fontSize: 18, color: Themes.COLORS.white }}
                    i18nText={props.backText || 'Back'}
                />
            </StyledTouchable>
        );
    }
    return <View style={{ height: 35, width: props.defaultWidthLeading || 60 }} />;
};

interface StyledHeaderActionProps {
    customAction?: ReactNode;
    defaultWidthAction?: number;
}

const StyledHeaderAction = (props: StyledHeaderActionProps) => {
    if (props.customAction) {
        const Action: FunctionComponent = props.customAction as FunctionComponent;
        return <Action />;
    }
    return <View style={{ height: 35, width: props.defaultWidthAction || 60 }} />;
};

interface StyledHeaderProps extends StyledHeaderLeadingProps, StyledHeaderActionProps {
    title?: string;
}

const StyledHeader: FunctionComponent<StyledHeaderProps> = (props: StyledHeaderProps) => {
    const navigation = useNavigation();
    const [sizeLeading, onLayoutLeading] = useComponentSize();
    const [sizeAction, onLayoutAction] = useComponentSize();
    const [defaultSize, setDefaultSize] = useState(0);

    const defaultLeading = () => {
        if (props.onPressLeading) props.onPressLeading();
        else navigation.goBack();
    };

    useEffect(() => {
        setDefaultSize(sizeAction.width > sizeLeading.width ? sizeAction.width : sizeLeading.width);
    }, [sizeLeading, sizeAction]);

    return (
        <View style={styles.container}>
            <View onLayout={onLayoutLeading}>
                <StyledHeaderLeading
                    canGoBack={navigation.canGoBack()}
                    onPressLeading={defaultLeading}
                    defaultWidthLeading={defaultSize}
                    {...props}
                />
            </View>
            <StyledText customStyle={styles.defaultHeader} i18nText={props.title || ''} />
            <View onLayout={onLayoutAction}>
                <StyledHeaderAction customAction={props.customAction} defaultWidthAction={defaultSize} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Metrics.safeTopPadding,
        paddingHorizontal: 20,
        backgroundColor: Themes.COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 110,
    },
    defaultHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Themes.COLORS.white,
    },
    leadingCanGoBack: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default memo(StyledHeader, (prevProps: StyledHeaderProps, nextProps: StyledHeaderProps) => {
    return prevProps.title === nextProps.title;
});
