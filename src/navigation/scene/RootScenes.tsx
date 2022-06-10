import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from 'app-redux/hooks';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Host } from 'react-native-portalize';
import navigationConfigs from '../config/options';
import { APP_ROUTE } from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

export type RootStackParamList = Record<string, any>;

const MainStack = createStackNavigator<RootStackParamList>();

const AppStack = () => (
    <Host>
        <MainStack.Navigator screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector(state => state.userInfo, isEqual);

    if (token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
