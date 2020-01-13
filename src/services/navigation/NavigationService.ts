import {NavigationActions} from 'react-navigation'

let navigator: any

function setTopLevelNavigator(navigatorRef: any) {
    navigator = navigatorRef
}

function navigate(routeName: any, params?: any) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    )
}

function goBack(key?: any) {
    navigator.dispatch(
        NavigationActions.back({
            key,
        }),
    )
}

// add other navigation functions that you need and export them

export default {
    goBack,
    navigate,
    setTopLevelNavigator,
}
