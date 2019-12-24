"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AppNavigation_1 = require("./services/navigation/AppNavigation");
var NavigationService_1 = require("./services/navigation/NavigationService");
var App = function () {
    return (
    // <Provider store={store}>
    //     <PersistGate
    //         loading={<ActivityIndicator/>}
    //         persistor={persistor}
    //     >
    <AppNavigation_1.default ref={function (navigatorRef) {
        NavigationService_1.default.setTopLevelNavigator(navigatorRef);
    }}/>
    //     </PersistGate>
    // </Provider>
    );
};
exports.default = App;
