import { Themes } from 'assets/themes';
import { CardStyleInterpolators } from '@react-navigation/stack';
import transition from './transition';
import { Platform } from 'react-native';

const navigationConfigs = {
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

export default navigationConfigs;
