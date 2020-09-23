/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const { width, height } = Dimensions.get('window');

const safeTopPadding = Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsTop : 0;
const safeBottomPadding = Platform.OS === 'ios' ? StaticSafeAreaInsets.safeAreaInsetsBottom : 0;
const Metrics = {
    navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    safeBottomPadding,
    safeTopPadding,
};

export default Metrics;
