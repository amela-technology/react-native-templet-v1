import { useNavigation } from '@react-navigation/native';
import Images from 'assets/images';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import * as React from 'react';
import { ImageStyle, ImageURISource, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

const useComponentSize = () => {
    const [size, setSize] = React.useState<any>({
        width: undefined,
        height: undefined,
    });

    const onLayout = React.useCallback((event) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, []);
    return [size, onLayout];
};

interface StyledHeaderLeadingProps {
    canGoBack?: boolean;
    customLeading?: React.ReactNode;
    onPressLeading?: () => void;
    backIcon?: ImageURISource;
    backIconCustomStyle?: StyleProp<ImageStyle>;
    backText?: string;
    backTextCustomStyle?: StyleProp<TextStyle>;
    defaultWidthLeading?: number;
}

const StyledHeaderLeading = (props: StyledHeaderLeadingProps) => {
    if (props.customLeading) {
        const Leading: React.FunctionComponent = props.customLeading as React.FunctionComponent;
        return <Leading />;
    }
    if (props.canGoBack) {
        return (
            <StyledTouchable
                customStyle={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}
                onPress={props.onPressLeading}
            >
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
    customAction?: React.ReactNode;
    defaultWidthAction?: number;
}

const StyledHeaderAction = (props: StyledHeaderActionProps) => {
    if (props.customAction) {
        const Action: React.FunctionComponent = props.customAction as React.FunctionComponent;
        return <Action />;
    }
    return <View style={{ height: 35, width: props.defaultWidthAction || 60 }} />;
};

interface StyledHeaderProps extends StyledHeaderLeadingProps, StyledHeaderActionProps {
    title?: string;
}

const StyledHeader: React.FunctionComponent<StyledHeaderProps> = (props: StyledHeaderProps) => {
    const navigation = useNavigation();
    const [sizeLeading, onLayoutLeading] = useComponentSize();
    const [sizeAction, onLayoutAction] = useComponentSize();
    const [defaultSize, setDefaultSize] = React.useState(0);

    const defaultLeading = () => {
        if (props.onPressLeading) props.onPressLeading();
        else navigation.goBack();
    };

    React.useEffect(() => {
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
});

export default React.memo(StyledHeader, (prevProps: StyledHeaderProps, nextProps: StyledHeaderProps) => {
    return prevProps.title === nextProps.title;
});
