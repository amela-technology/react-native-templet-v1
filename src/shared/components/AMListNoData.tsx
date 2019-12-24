import * as React from "react"
import {ActivityIndicator, StyleSheet, Text, View} from "react-native"
import {Themes} from "../../assets/themes"
import AMText from "./AMText"
import TouchableRipple from "./AMTouchable"

interface AMListNoDataProps {
    text?: string,
    refreshable?: boolean,

    loading?: boolean

    onRefresh?(): any,
}

const AMListNoData = (props: AMListNoDataProps) => {
    return (
        <View style={styles.container}>
            {props.loading ? (
                <View style={{alignItems: "center"}}>
                    <ActivityIndicator/>
                </View>
            ) : (
                <Text>{props.text || "Không có dữ liệu"}</Text>
            )}
            {!!props.refreshable && !props.loading ? (
                <TouchableRipple
                    onPress={props.onRefresh}
                >
                    <AMText text={"Tải lại"} customStyle={styles.textReload}/>
                </TouchableRipple>
            ) : <View/>}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    text: {
        fontWeight: "600",
        fontSize: 14,
        color: Themes.colors.primary,
        textAlign: "center",
    },
    textReload: {
        margin: 12,
        color: Themes.colors.primary,
    },
})

export default AMListNoData
