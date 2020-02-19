import {createAppContainer, createSwitchNavigator} from 'react-navigation'
// import SplashView from "feature/authenticate/splash/SplashView"
import {APP_ROUTE} from 'services/navigation/config/routes'
import SplashView from 'feature/splash/SplashView'
// import LoginStack from "services/navigation/sence/LoginStack"
// import HomeStack from "services/navigation/sence/HomeStack"

const rootSwitch = createSwitchNavigator(
    {
        // [APP_ROUTE.loginRoute]: LoginStack,
        // [APP_ROUTE.homeRoute]: HomeStack,
        [APP_ROUTE.authLoading]: SplashView,
    },
    {
        initialRouteName: APP_ROUTE.authLoading,
    },
)

const AppContainer = createAppContainer(rootSwitch)
export default AppContainer
