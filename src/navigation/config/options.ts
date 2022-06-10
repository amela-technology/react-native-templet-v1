import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import { Themes } from 'assets/themes';
import { Platform } from 'react-native';
import transition from './transition';
import { Platform } from 'react-native';

const navigationConfigs: StackNavigationOptions = {
    cardStyle: {
        backgroundColor: Themes.COLORS.white,
        // paddingBottom: Metrics.safeBottomPadding,
    },
    keyboardHandlingEnabled: Platform.OS === 'ios',
    headerShown: false,
    gestureEnabled: true,
    // gestureDirection: 'default',
    cardShadowEnabled: true,
    keyboardHandlingEnabled: Platform.OS === 'ios',
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
};

export const tabScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
};

export default navigationConfigs;
