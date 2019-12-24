"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var opacityTransition = function (index, position) {
    var opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
    });
    return {
        opacity: opacity,
    };
};
var translateXTransition = function (index, position, layout) {
    var translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [layout.initWidth, 0, -(layout.initWidth / 4)],
    });
    var opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
    });
    return { opacity: opacity, transform: [{ translateX: translateX }] };
};
var translateYTransition = function (index, position, layout) {
    var height = layout.initHeight;
    var translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
    });
    var opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
    });
    return { opacity: opacity, transform: [{ translateY: translateY }] };
};
exports.TransitionConfiguration = function () {
    return {
        transitionSpec: {
            duration: 250,
            easing: react_native_1.Easing.linear,
            // easing: Easing.bezier(0.19, 1, 0.22, 1),
            timing: react_native_1.Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: function (sceneProps) {
            var layout = sceneProps.layout, position = sceneProps.position, scene = sceneProps.scene;
            var index = scene.index, route = scene.route;
            var params = route.params || {};
            var transition = params.transition || "translateX";
            var trans = {
                opacity: opacityTransition(index, position),
                translateY: translateYTransition(index, position, layout),
                translateX: translateXTransition(index, position, layout),
            };
            return trans[transition];
        },
        containerStyle: {
            backgroundColor: "fff",
        },
    };
};
