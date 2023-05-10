import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import { Themes } from 'assets/themes';
import { Platform } from 'react-native';
import transition from './transition';

const navigationConfigs: StackNavigationOptions = {
    cardStyle: {
        backgroundColor: Themes.COLORS.white,
        // paddingBottom: Metrics.safeBottomPadding,
    },
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
