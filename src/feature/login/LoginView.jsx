"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var AMButton_1 = require("../../shared/components/AMButton");
var AMInput_1 = require("../../shared/components/AMInput");
var AMList_1 = require("../../shared/components/AMList");
var LoginView = function () {
    return (<react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text>I am Login screen</react_native_1.Text>
            <AMButton_1.default title={"hiihi"} onPress={function () {
        return null;
    }}/>
            <AMInput_1.default value={"hiihi"}/>
            <AMList_1.default data={[]} renderItem={function () {
        return null;
    }}/>
        </react_native_1.View>);
};
exports.default = LoginView;
