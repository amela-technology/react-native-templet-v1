import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Host } from 'react-native-portalize';
import { useAppSelector } from 'app-redux/hooks';
import { isIos } from 'utilities/helper';
import { APP_ROUTE } from '../config/routes';
import navigationConfigs from '../config/options';
import MainTabContainer from './TabScenes';
import AuthStack from './AuthScenes';

const MainStack = createStackNavigator();

const AppStack = () => (
    <Host>
        <MainStack.Navigator keyboardHandlingEnabled={isIos} headerMode={'none'} screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector((state) => state.userInfo);
    if (token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
