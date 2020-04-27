import { CommonActions } from '@react-navigation/native'

let navigator: any

const setTopLevelNavigator = (navigatorRef: any) => {
    navigator = navigatorRef
}

const navigate = (routeName: any, params?: any) => {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params,
        }),
    )
}

const goBack = (route?: any, state?: any) => {
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
