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
import {ActivityIndicator, View} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import NavigationService from './services/navigation/NavigationService'
import {persistor, store} from './shared/store/store'
import {NavigationContainer} from '@react-navigation/native'
import Navigation from './services/navigation/sence/Navigation'
import {RootSiblingParent} from 'react-native-root-siblings'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                <RootSiblingParent>
                    <NavigationContainer
                        ref={(navigatorRef: any) => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}>
                        <Navigation />
                    </NavigationContainer>
                </RootSiblingParent>
            </PersistGate>
        </Provider>
    )
}

export default App
