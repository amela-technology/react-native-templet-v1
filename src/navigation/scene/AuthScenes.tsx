import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import navigationConfigs from 'navigation/config/options';
import { isIos } from 'utilities/helper';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import LoginScreen from 'feature/authentication/LoginScreen';
import RegisterScreen from 'feature/authentication/RegisterScreen';
import ForgotPasswordScreen from 'feature/authentication/ForgotPwdScreen';
import SendOTP from 'feature/authentication/SendOtp';
import ChangePass from 'feature/authentication/ChangePass';

const MainStack = createStackNavigator();

const AuthStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER} component={RegisterScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.FORGOTPASS} component={ForgotPasswordScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SENDOTP} component={SendOTP} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGEPASS} component={ChangePass} />
    </MainStack.Navigator>
);

export default AuthStack;
