import AsyncStorage from "@react-native-community/async-storage"
import React, {useEffect} from "react"
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
} from "react-native"
import {AppRoute} from "../../services/navigation/config/Routes"
import NavigationService from "../../services/navigation/NavigationService"

// interface Props {
//     navigation: NavigationStackProp
// }

const SplashView = () => {

    async function _bootstrapAsync() {
        const userToken = await AsyncStorage.getItem("userToken")
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        NavigationService.navigate(userToken ? AppRoute.HOME_ROUTE : AppRoute.LOGIN_ROUTE)
    }

    useEffect(() => {
        _bootstrapAsync()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator/>
            <StatusBar barStyle="default"/>
        </View>
    )
}

const styles = StyleSheet.create(({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
}))
export default SplashView
