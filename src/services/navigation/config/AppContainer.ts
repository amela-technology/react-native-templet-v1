import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeView from '../../../feature/home/HomeView'
import LoginView from '../../../feature/login/LoginView'
import SplashView from '../../../feature/splash/SplashView'
import ComponentsAwesome from '../../../feature/splash/ComponentsAwesome'
import {APP_ROUTE, LOGIN_ROUTE} from './routes'
import {transition} from './transition'

const loginStack = createStackNavigator(
    {
        [LOGIN_ROUTE.login]: {
            screen: LoginView,
        },
        [LOGIN_ROUTE.register]: {
            screen: HomeView,
        },
    },
    {
        initialRouteName: LOGIN_ROUTE.register,
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: transition,
    },
)

const rootSwitch = createSwitchNavigator(
    {
        [APP_ROUTE.loginRoute]: loginStack,
        [APP_ROUTE.authLoading]: SplashView,
        [APP_ROUTE.commonComponents]: ComponentsAwesome,
    },
    {
        initialRouteName: APP_ROUTE.commonComponents,
    },
)

const AppContainer = createAppContainer(rootSwitch)
export default AppContainer
