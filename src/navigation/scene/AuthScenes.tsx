import { createStackNavigator } from '@react-navigation/stack';
import ChangePassword from 'feature/authentication/ChangePassword';
import ForgotPasswordScreen from 'feature/authentication/ForgotPwdScreen';
import LoginScreen from 'feature/authentication/LoginScreen';
import RegisterScreen from 'feature/authentication/RegisterScreen';
import SendOTP from 'feature/authentication/SendOtp';
import navigationConfigs from 'navigation/config/options';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import React from 'react';
import { RootStackParamList } from './RootScenes';

const MainStack = createStackNavigator<RootStackParamList>();

const AuthStack = () => (
    <MainStack.Navigator screenOptions={navigationConfigs}>
        <MainStack.Screen name={AUTHENTICATE_ROUTE.LOGIN} component={LoginScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.REGISTER} component={RegisterScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.FORGOT_PASS} component={ForgotPasswordScreen} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.SEND_OTP} component={SendOTP} />
        <MainStack.Screen name={AUTHENTICATE_ROUTE.CHANGE_PASS} component={ChangePassword} />
    </MainStack.Navigator>
);

export default AuthStack;
