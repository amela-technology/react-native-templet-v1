import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import navigationConfigs from '../config/options'
import { Host } from 'react-native-portalize'
import StyledTabBar from 'navigation/component/StyledTabBar'
// Screen
import LoginView from 'feature/login/LoginView'
import HomeView from 'feature/home/HomeView'
import NotificationView from 'feature/notification/NotificationView'
import SettingView from 'feature/setting/Setting'

import { APP_ROUTE, TAB_NAVIGATION_ROOT, AUTHENTICATE_ROUTE } from '../config/routes'
import { useSelector } from 'react-redux'
import { RootState } from 'shared/store/rootReducer'
import { isIos } from 'shared/utilities/helper'

const MainStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

const MainTabContainer = () => {
    const getTabBarVisible = (route: any) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT
        // list tab bar name to hide
        const list: any[] = []
        if (list.includes(routeName)) {
            return false
        }
        return true
    }
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            <MainTab.Screen
                name={TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT}
                component={HomeView}
                options={({ route }: any) => ({
                    tabBarVisible: getTabBarVisible(route),
                })}
            />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT} component={NotificationView} />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT} component={SettingView} />
        </MainTab.Navigator>
    )
}

const AuthStack = () => {
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
            <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginView} />
        </MainStack.Navigator>
    )
}

const AppStack = () => {
    return (
        <Host>
            <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
                <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
            </MainStack.Navigator>
        </Host>
    )
}

const Navigation = () => {
    const authentication = useSelector((state: RootState) => state.authentication)
    if (authentication.userToken) {
        return <AppStack />
    } else {
        return <AuthStack />
    }
}

export default Navigation
