import {Platform} from "react-native"

const ENABLE_PRODUCT = false // !!!IMPORTANT, dont' update if you dont know what to do =))
const isIOS = Platform.OS === "ios"
const keyiOS = "KEY_IOS_HERE"
const keyAndroid = "KEY_ANDROID_HERE"
const deploymentKey = isIOS ? keyiOS : keyAndroid

function isDisableProduct() {
    return !__DEV__ && ENABLE_PRODUCT
}

export {ENABLE_PRODUCT, deploymentKey}
