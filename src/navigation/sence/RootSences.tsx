import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Host } from 'react-native-portalize';
// Screen
import LoginScreen from 'feature/authentication/LoginScreen';
import HomeScreen from 'feature/home/HomeScreen';
import HomeDetailScreen from 'feature/home/HomeDetailScreen';
import NotificationView from 'feature/notification/NotificationScreen';
import SettingView from 'feature/setting/SettingScreen';

import { useSelector } from 'react-redux';
import { RootState } from 'app-redux/rootReducer';
import { isIos } from 'utilities/helper';
import { APP_ROUTE, TAB_NAVIGATION_ROOT, AUTHENTICATE_ROUTE } from '../config/routes';
import StyledTabBar from '../components/StyledTabBar';
import navigationConfigs from '../config/options';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
            <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
        </MainStack.Navigator>
    );
};

const MainTabContainer = () => {
    const getTabBarVisible = (route: any) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT;
        // list tab bar name to hide
        const list: any[] = [];
        if (list.includes(routeName)) {
            return false;
        }
        return true;
    };
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            <MainTab.Screen
                name={TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT}
                component={HomeStack}
                options={({ route }: any) => ({
                    tabBarVisible: getTabBarVisible(route),
                })}
            />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT} component={NotificationView} />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT} component={SettingView} />
        </MainTab.Navigator>
    );
};

const AuthStack = () => {
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
            <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
        </MainStack.Navigator>
    );
};

const AppStack = () => {
    return (
        <Host>
            <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
                <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
            </MainStack.Navigator>
        </Host>
    );
};

const Navigation: React.FunctionComponent = () => {
    const authentication = useSelector((state: RootState) => state.authentication);
    if (authentication.userToken) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
