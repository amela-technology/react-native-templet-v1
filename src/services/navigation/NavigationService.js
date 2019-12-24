"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_1 = require("react-navigation");
var navigator;
function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}
function navigate(routeName, params) {
    navigator.dispatch(react_navigation_1.NavigationActions.navigate({
        routeName: routeName,
        params: params,
    }));
}
function goBack(key) {
    navigator.dispatch(react_navigation_1.NavigationActions.back({
        key: key,
    }));
}
// add other navigation functions that you need and export them
exports.default = {
    goBack: goBack,
    navigate: navigate,
    setTopLevelNavigator: setTopLevelNavigator,
};
