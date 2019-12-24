"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var themes_1 = require("../../assets/themes");
var AMText_1 = require("./AMText");
var AMTouchable_1 = require("./AMTouchable");
var AMListNoData = function (props) {
    return (<react_native_1.View style={styles.container}>
            {props.loading ? (<react_native_1.View style={{ alignItems: "center" }}>
                    <react_native_1.ActivityIndicator />
                </react_native_1.View>) : (<react_native_1.Text>{props.text || "Không có dữ liệu"}</react_native_1.Text>)}
            {!!props.refreshable && !props.loading ? (<AMTouchable_1.default onPress={props.onRefresh}>
                    <AMText_1.default text={"Tải lại"} customStyle={styles.textReload}/>
                </AMTouchable_1.default>) : <react_native_1.View />}

        </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    text: {
        fontWeight: "600",
        fontSize: 14,
        color: themes_1.Themes.colors.primary,
        textAlign: "center",
    },
    textReload: {
        margin: 12,
        color: themes_1.Themes.colors.primary,
    },
});
exports.default = AMListNoData;
