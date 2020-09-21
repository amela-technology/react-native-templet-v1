/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './shared/store/store'
import { NavigationContainer } from '@react-navigation/native'
import 'shared/utilities/i18next'
import { navigationRef } from 'navigation/NavigationService'
import Navigation from 'navigation/sence/RootSences'

LogBox.ignoreLogs(['Require cycle:'])

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <NavigationContainer ref={navigationRef}>
                    <Navigation />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App
