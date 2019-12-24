"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_1 = require("react-navigation");
var react_navigation_stack_1 = require("react-navigation-stack");
var HomeView_1 = require("../../feature/home/HomeView");
var LoginView_1 = require("../../feature/login/LoginView");
var SplashView_1 = require("../../feature/splash/SplashView");
var Routes_1 = require("./config/Routes");
var Transition_1 = require("./config/Transition");
var LoginStack = react_navigation_stack_1.createStackNavigator((_a = {},
    _a[Routes_1.LoginRoute.LOGIN] = {
        screen: LoginView_1.default,
    },
    _a[Routes_1.LoginRoute.REGISTER] = {
        screen: HomeView_1.default,
    },
    _a), {
    initialRouteName: Routes_1.LoginRoute.REGISTER,
    defaultNavigationOptions: {
        gesturesEnabled: true,
    },
    transitionConfig: Transition_1.TransitionConfiguration,
});
var RootSwitch = react_navigation_1.createSwitchNavigator((_b = {},
    _b[Routes_1.AppRoute.LOGIN_ROUTE] = LoginStack,
    _b[Routes_1.AppRoute.AUTH_LOADING] = SplashView_1.default,
    _b), {
    initialRouteName: Routes_1.AppRoute.AUTH_LOADING,
});
var AppContainer = react_navigation_1.createAppContainer(RootSwitch);
exports.default = AppContainer;
