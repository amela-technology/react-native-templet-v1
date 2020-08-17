import * as React from 'react'
import { ActivityIndicator, StyleSheet, Text, View, StyleProp, TextStyle } from 'react-native'
import { Themes } from 'assets/themes'
import StyledText from './StyledText'
import TouchableRipple from './StyledTouchable'

interface StyledListNoDataProps {
    text?: string
    refreshable?: boolean
    customStyle?: StyleProp<TextStyle>
    loading?: boolean

    onRefresh?(): any
}

const StyledNoData = (props: StyledListNoDataProps) => {
    return (
        <View style={[styles.container, props.customStyle]}>
            {props.loading ? (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <Text>{props.text || 'Không có dữ liệu'}</Text>
            )}
            {!!props.refreshable && !props.loading ? (
                <TouchableRipple onPress={props.onRefresh}>
                    <StyledText text="Tải lại" customStyle={styles.textReload} />
                </TouchableRipple>
            ) : (
                <View />
            )}
        </View>
    )
}
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
})

export default StyledNoData
