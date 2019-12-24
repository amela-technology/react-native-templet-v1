"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
function isAndroid() {
    return react_native_1.Platform.OS === "android";
}
exports.isAndroid = isAndroid;
function isIos() {
    return react_native_1.Platform.OS === "ios";
}
exports.isIos = isIos;
