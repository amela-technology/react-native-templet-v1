import transition from '../config/transition'
import { Themes } from 'assets/themes'
import { CardStyleInterpolators } from '@react-navigation/stack'

const navigationConfigs = {
    cardStyle: {
        backgroundColor: Themes.COLORS.primary,
        // paddingBottom: Metrics.safeBottomPadding,
    },
    headerShown: false,
    gestureEnabled: true,
    // gestureDirection: 'default',
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
}

export default navigationConfigs
