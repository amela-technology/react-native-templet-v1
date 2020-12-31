import * as React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    onPress(): void;
    onLongPress?(): void;
}

const StyledButton: React.FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    return (
        <StyledTouchable
            customStyle={[styles.container, props.customStyle]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <StyledText i18nText={props.title} customStyle={styles.title} />
        </StyledTouchable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 42,
        width: 128,
        borderColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        color: Themes.COLORS.textPrimary,
    },
});

export default StyledButton;
