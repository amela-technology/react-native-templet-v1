import {CommonActions} from '@react-navigation/native'

let navigator: any

function setTopLevelNavigator(navigatorRef: any) {
    navigator = navigatorRef
}

function navigate(routeName: any, params?: any) {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params,
        }),
    )
}

function goBack(route?: any, state?: any) {
    navigator.dispatch({
        ...CommonActions.goBack(),
        source: route.key,
        target: state.key,
    })
}

// add other navigation functions that you need and export them

export default {
    goBack,
    navigate,
    setTopLevelNavigator,
}
