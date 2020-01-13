import * as React from 'react'
import {StyleProp, Text, ViewStyle, View} from 'react-native'
import {Themes} from '../../../assets/themes'
import {ScaledSheet} from 'react-native-size-matters'
interface StyledHeaderProps {
    title: string
    buttonLeft?: React.ReactNode
    buttonRight?: React.ReactNode
}

const StyledHeader = (props: StyledHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>{props.buttonLeft || <View />}</View>
            <View style={styles.wrapTitle}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.right}>{props.buttonRight || <View />}</View>
        </View>
    )
}
const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '60@vs',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Themes.colors.header,
    },
    wrapTitle: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '25@ms',
        color: Themes.colors.white,
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 1,
    },
})
export default StyledHeader
