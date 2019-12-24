/*
 * platform/application wide metrics for proper styling
 */
import {Dimensions, Platform} from "react-native"

const {width, height} = Dimensions.get("window")

const Metrics = {
    navBarHeight: Platform.OS === "ios" ? 54 : 66,
    screenHeight: width < height ? height : width,
    screenWidth: width < height ? width : height,
}

export default Metrics
