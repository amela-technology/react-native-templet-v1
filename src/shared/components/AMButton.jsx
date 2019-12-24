"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var themes_1 = require("../../assets/themes");
var AMTouchable_1 = require("./AMTouchable");
var AMButton = function (props) {
    return (<AMTouchable_1.default customStyle={styles.container} onPress={props.onPress} onLongPress={props.onLongPress}>
            <react_native_1.Text style={styles.title}>{props.title}</react_native_1.Text>
        </AMTouchable_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: 42,
        width: 128,
        margin: 4,
        borderColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        color: themes_1.Themes.colors.textPrimary,
    },
});
exports.default = AMButton;
