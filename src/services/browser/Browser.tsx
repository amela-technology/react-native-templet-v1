import {Themes} from '../../assets/themes'
import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import NavigationService from '../../services/navigation/NavigationService'
// import WebView from "react-native-webview"
import {APP_ROUTE} from '../navigation/config/routes'
// import {useNavigationParam} from '../../shared/hooks/NavigationHooks'
interface BrowserParams {
    title: string
    url: string
}
//use this function to start a webview
export function startBrowser(params: BrowserParams) {
    // NavigationService.navigate(APP_ROUTE.browser, params)
}
const PARAMS_TITLE = 'title'
const PARAMS_URL = 'url'
const Browser = () => {
    // const title = useNavigationParam(PARAMS_TITLE)
    // const url = useNavigationParam(PARAMS_URL)
    function handleBackPress() {
        NavigationService.goBack()
    }

    return <View style={styles.container}>{/*<WebView source={{uri: url}} />*/}</View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.primary,
    },
})
export default React.memo(Browser)
