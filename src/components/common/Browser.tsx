import { Themes } from 'assets/themes'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
// import {useNavigationParam} from '../../shared/hooks/NavigationHooks'
// use this function to start a webview
export const startBrowser = () => {
    // NavigationService.navigate(APP_ROUTE.browser, params)
}
const Browser = () => {
    return <View style={styles.container}>{/* <WebView source={{uri: url}} />*/}</View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.primary,
    },
})
export default React.memo(Browser)
