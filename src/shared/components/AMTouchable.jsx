"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var helper_1 = require("../utilities/helper");
var DEFAULT_OPACITY = 0.5;
var AMTouchable = function (props) {
    function handlePress() {
        props.onPress && props.onPress();
    }
    function handlePressIn() {
        props.onPressIn && props.onPressIn();
    }
    function handlePressOut() {
        props.onPressOut && props.onPressOut();
    }
    function handleLongPress() {
        props.onLongPress && props.onLongPress();
    }
    function renderAndroidButton() {
        var customStyle = props.customStyle, disabled = props.disabled, children = props.children;
        return (<react_native_1.TouchableNativeFeedback onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} onLongPress={handleLongPress} accessibilityTraits={"button"} disabled={disabled}>
                <react_native_1.View style={customStyle}>
                    {children}
                </react_native_1.View>
            </react_native_1.TouchableNativeFeedback>);
    }
    function renderIosButton() {
        var customStyle = props.customStyle, disabled = props.disabled, children = props.children;
        return (<react_native_1.TouchableOpacity onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} onLongPress={handleLongPress} accessibilityTraits={"button"} activeOpacity={DEFAULT_OPACITY} disabled={disabled} {...props}>
                <react_native_1.View style={customStyle}>
                    {children}
                </react_native_1.View>
            </react_native_1.TouchableOpacity>);
    }
    return helper_1.isAndroid() ? renderAndroidButton() : renderIosButton();
};
exports.default = AMTouchable;
