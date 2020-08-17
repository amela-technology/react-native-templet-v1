import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { Themes } from 'assets/themes'

interface Props {
    customStyle?: StyleProp<TextStyle>
}
const StyledDivider = (props: Props) => {
    return <View style={[styles.container, props.customStyle]} />
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Themes.COLORS.border,
        height: 1,
    },
})
export default StyledDivider
