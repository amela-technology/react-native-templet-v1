"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var themes_1 = require("../../assets/themes");
var AMText = function (props) {
    return (<react_native_1.Text style={[styles.text, props.customStyle]} {...props}>
            {props.text}
        </react_native_1.Text>);
};
var styles = react_native_1.StyleSheet.create({
    text: {
        color: themes_1.Themes.colors.textPrimary,
        fontSize: 12,
        fontFamily: themes_1.Themes.fonts.defaultFont,
    },
});
exports.default = AMText;
