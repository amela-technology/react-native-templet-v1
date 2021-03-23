import React, { FunctionComponent } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from '.';

interface StyledButtonProps {
    title: string;
    customStyle?: StyleProp<ViewStyle>;
    onPress(params?: any): void;
    onLongPress?(): void;
    disabled?: boolean;
}

const StyledButton: FunctionComponent<StyledButtonProps> = (props: StyledButtonProps) => {
    const { title, customStyle, onPress, onLongPress, disabled = false } = props;
    return (
        <StyledTouchable
            customStyle={[styles.container, customStyle]}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
        >
            <StyledText i18nText={title} customStyle={styles.title} />
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
