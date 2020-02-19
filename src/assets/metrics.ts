/*
 * platform/application wide metrics for proper styling
 */
import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window')
import {getInset} from 'react-native-safe-area-view'
const safeTopPadding = getInset('top', false) //2nd param islandscape
const safeBottomPadding = getInset('bottom', false) //2nd param islandscape
const Metrics = {
    navBarHeight: Platform.OS === 'ios' ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
    safeBottomPadding,
    safeTopPadding,
}

export default Metrics
