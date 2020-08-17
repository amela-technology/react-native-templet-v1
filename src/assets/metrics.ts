/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

const { width, height } = Dimensions.get('window')

const safeTopPadding = StaticSafeAreaInsets.safeAreaInsetsTop
const safeBottomPadding = StaticSafeAreaInsets.safeAreaInsetsBottom
const Metrics = {
    navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    safeBottomPadding,
    safeTopPadding,
}

export default Metrics
