import { Themes } from 'assets/themes';
import React, { ReactNode, memo } from 'react';
import { ViewStyle, ViewProps, StyleProp, FlexAlignType, View } from 'react-native';

type Direction = 'row' | 'column' | 'column-reverse' | 'row-reverse';
type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly';
type Position = 'absolute' | 'relative';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
type OverFlow = 'visible' | 'hidden' | 'scroll';
export type ShadowConfig = {
    shadowColor?: string;
    shadowOffset?: {
        width?: number;
        height?: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
};
export interface StyledViewProps extends ViewProps {
    flexWrap?: FlexWrap;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
    top?: number | string;
    zIndex?: number;
    overflow?: OverFlow;
    borderBottomWidth?: number;
    borderEndWidth?: number | string;
    borderLeftWidth?: number;
    borderRightWidth?: number;
    borderStartWidth?: number | string;
    borderTopWidth?: number;
    borderBottomColor?: string;
    borderBottomEndRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomStartRadius?: number;
    borderEndColor?: string;
    borderLeftColor?: string;
    borderRightColor?: string;
    borderStartColor?: string;
    borderStyle?: 'solid' | 'dotted' | 'dashed';
    borderTopColor?: string;
    borderTopEndRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderTopStartRadius?: number;
    opacity?: number;
    position?: Position;
    margin?: number;
    flex?: number;
    alignItems?: FlexAlignType;
    alignSelf?: 'auto' | FlexAlignType;
    marginLeft?: number;
    marginRight?: number;
    marginBottom?: number;
    marginTop?: number;
    direction?: Direction;
    padding?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    width?: number | string;
    height?: number | string;
    border?: boolean;
    borderWidth?: number;
    borderColor?: string;
    color?: string;
    justifyContent?: JustifyContent;
    middle?: boolean;
    borderRadius?: number;
    shadow?: boolean;
    shadowConfig?: ShadowConfig;
    style?: StyleProp<ViewStyle>;
    circle?: number;
    children?: ReactNode;
}

const StyledView = (props: StyledViewProps) => {
    const {
        margin,
        marginLeft,
        alignItems,
        alignSelf,
        marginRight,
        marginTop,
        marginBottom,
        direction,
        padding,
        paddingHorizontal,
        paddingVertical,
        width,
        height,
        border,
        borderWidth,
        borderColor,
        color,
        justifyContent,
        middle,
        paddingRight,
        paddingBottom,
        paddingLeft,
        paddingTop,
        borderRadius,
        shadow,
        flex,
        shadowConfig,
        position,
        flexWrap,
        left,
        right,
        bottom,
        top,
        zIndex,
        overflow,
        borderBottomWidth,
        borderEndWidth,
        borderLeftWidth,
        borderRightWidth,
        borderStartWidth,
        borderTopWidth,
        borderBottomColor,
        borderBottomEndRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderBottomStartRadius,
        borderEndColor,
        borderLeftColor,
        borderRightColor,
        borderStartColor,
        borderStyle,
        borderTopColor,
        borderTopEndRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderTopStartRadius,
        opacity,
        style = {},
        circle,
        children,
        ...rest
    } = props;

    const styleComponent: any[] = [
        margin && { margin },
        marginLeft && { marginLeft },
        marginRight && { marginRight },
        marginTop && { marginTop },
        marginBottom && { marginBottom },
        direction && { flexDirection: direction },
        padding && { padding },
        paddingRight && { paddingRight },
        paddingBottom && { paddingBottom },
        paddingLeft && { paddingLeft },
        paddingTop && { paddingTop },
        paddingHorizontal && { paddingHorizontal },
        paddingVertical && { paddingVertical },
        width && { width },
        height && { height },
        border && {
            borderWidth: 1,
            borderColor: Themes.COLORS.placeHolderGray,
        },
        borderWidth && { borderWidth },
        borderColor && { borderColor },
        color && { backgroundColor: color },
        justifyContent && { justifyContent },
        middle && { alignItems: 'center' },
        alignItems && { alignItems },
        alignSelf && { alignSelf },
        borderRadius && { borderRadius },
        flex && { flex },
        shadow && {
            shadowColor: Themes.COLORS.black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            ...shadowConfig,
        },
        position && { position },
        flexWrap && { flexWrap },
        left && { left },
        right && { right },
        bottom && { bottom },
        top && { top },
        zIndex && { zIndex },
        overflow && { overflow },
        borderBottomWidth && { borderBottomWidth },
        borderEndWidth && { borderEndWidth },
        borderLeftWidth && { borderLeftWidth },
        borderRightWidth && {
            borderRightWidth,
        },
        borderStartWidth && { borderStartWidth },
        borderTopWidth && { borderTopWidth },
        borderBottomColor && { borderBottomColor },
        borderBottomEndRadius && { borderBottomEndRadius },
        borderBottomLeftRadius && { borderBottomLeftRadius },
        borderBottomRightRadius && { borderBottomRightRadius },
        borderBottomStartRadius && { borderBottomStartRadius },
        borderEndColor && { borderEndColor },
        borderLeftColor && { borderLeftColor },
        borderRightColor && { borderRightColor },
        borderStartColor && { borderStartColor },
        borderStyle && { borderStyle },
        borderTopColor && { borderTopColor },
        borderTopEndRadius && { borderTopEndRadius },
        borderTopLeftRadius && { borderTopLeftRadius },
        borderTopRightRadius && { borderTopRightRadius },
        borderTopStartRadius && { borderTopStartRadius },
        opacity && { opacity },
        circle && {
            width: circle,
            height: circle,
            borderRadius: circle / 2,
        },
        style,
    ];
    return (
        <View style={styleComponent} {...rest}>
            {children}
        </View>
    );
};

export default memo(StyledView);
