import {createAppContainer, createSwitchNavigator} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"
import HomeView from "../../feature/home/HomeView"
import LoginView from "../../feature/login/LoginView"
import SplashView from "../../feature/splash/SplashView"
import {AppRoute, LoginRoute} from "./config/Routes"
import {TransitionConfiguration} from "./config/Transition"

const LoginStack = createStackNavigator(
    {
        [LoginRoute.LOGIN]: {
            screen: LoginView,
        },
        [LoginRoute.REGISTER]: {
            screen: HomeView,
        },
    },
    {
        initialRouteName: LoginRoute.REGISTER,
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: TransitionConfiguration,
    },
)

const RootSwitch = createSwitchNavigator(
    {
        [AppRoute.LOGIN_ROUTE]: LoginStack,
        [AppRoute.AUTH_LOADING]: SplashView,
    },
    {
        initialRouteName: AppRoute.AUTH_LOADING,
    },
)

const AppContainer = createAppContainer(RootSwitch)
export default AppContainer
