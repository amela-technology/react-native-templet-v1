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
import { ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import { RootSiblingParent } from 'react-native-root-siblings'
import 'shared/utilities/i18next'
import { navigationRef } from 'services/navigation/NavigationService'
import { APIProvider } from 'shared/context/APIProvider'
import { persistor, store } from './shared/store/store'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <APIProvider>
                    <RootSiblingParent>
                        <NavigationContainer ref={navigationRef}>{/* <RootStack /> */}</NavigationContainer>
                    </RootSiblingParent>
                </APIProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
