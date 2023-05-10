import React, { FunctionComponent } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native';
import { Themes } from 'assets/themes';

const StyledIndicator: FunctionComponent<ActivityIndicatorProps> = (props: ActivityIndicatorProps) => {
    return <ActivityIndicator color={Themes.COLORS.primary} size={'small'} style={styles.container} {...props} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StyledIndicator;
