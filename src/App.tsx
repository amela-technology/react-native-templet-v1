/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react"
import {ActivityIndicator, View} from "react-native"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import AppContainer from "./services/navigation/AppNavigation"
import NavigationService from "./services/navigation/NavigationService"
import {persistor, store} from "./shared/store/store"

const App = () => {
    return (
        // <Provider store={store}>
        //     <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <AppContainer
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
            }}
        />
        //     </PersistGate>
        // </Provider>
    )
}

export default App
