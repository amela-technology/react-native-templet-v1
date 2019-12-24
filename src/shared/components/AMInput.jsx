"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var AMInput = function (props) {
    var input;
    function focus() {
        input && input.focus();
    }
    return (<react_native_1.TextInput ref={function (ref) { return input = ref; }} style={[styles.textInput, props.customStyle]} placeholderTextColor={props.placeholderTextColor || "black"} placeholder={props.placeholder} underlineColorAndroid="transparent" {...props}/>);
};
var styles = react_native_1.StyleSheet.create({
    textInput: {
        height: 32,
        width: 128,
        margin: 4,
        padding: 2,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
});
exports.default = AMInput;
