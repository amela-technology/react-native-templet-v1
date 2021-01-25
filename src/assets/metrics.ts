/* eslint-disable no-nested-ternary */
/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const safeTopPaddingPlatform = Platform.OS === 'android' ? verticalScale(15) : StaticSafeAreaInsets.safeAreaInsetsTop;
const safeTopPadding = safeTopPaddingPlatform === 0 ? verticalScale(30) : safeTopPaddingPlatform;
const safeBottomPadding =
    Platform.OS === 'android'
        ? 0
        : StaticSafeAreaInsets.safeAreaInsetsBottom === 0
        ? 20
        : StaticSafeAreaInsets.safeAreaInsetsBottom;
const Metrics = {
    navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    safeBottomPadding,
    safeTopPadding,
};

export default Metrics;
