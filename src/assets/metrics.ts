/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const safeTopPadding = initialWindowMetrics?.insets.top || 0;
const safeBottomPadding = initialWindowMetrics?.insets.bottom || 0;
const Metrics = {
    navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    safeBottomPadding,
    safeTopPadding,
};

export default Metrics;
