import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Themes } from 'assets/themes';
import StyledText from './StyledText';
import TouchableRipple from './StyledTouchable';

interface StyledListNoDataProps {
    text?: string;
    redressable?: boolean;
    loading?: boolean;
    onRefresh?(): any;
}

const StyledNoData: React.FunctionComponent<StyledListNoDataProps> = (props: StyledListNoDataProps) => {
    return (
        <View style={styles.container}>
            {props.loading ? (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <Text>{props.text || 'Không có dữ liệu'}</Text>
            )}
            {!!props.redressable && !props.loading ? (
                <TouchableRipple onPress={props.onRefresh}>
                    <StyledText customStyle={styles.textReload}>Tải lại</StyledText>
                </TouchableRipple>
            ) : (
                <View />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    text: {
        fontWeight: '600',
        fontSize: 14,
        color: Themes.COLORS.primary,
        textAlign: 'center',
    },
    textReload: {
        margin: 12,
        color: Themes.COLORS.primary,
    },
});

export default StyledNoData;
