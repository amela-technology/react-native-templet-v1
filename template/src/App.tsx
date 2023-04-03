import React, { FunctionComponent, useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'app-redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { loadLocaleLanguage } from 'utilities/i18next';
import { navigationRef } from 'navigation/NavigationService';
import Navigation from 'navigation/scene/RootScenes';
import { RootSiblingParent } from 'react-native-root-siblings';
import { addMenuClearAsyncStorage, getCodePushInfo } from 'utilities/helper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Require cycle:', 'ViewPropTypes']);

if (__DEV__) {
    import('../ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App: FunctionComponent = () => {
    const onBeforeLift = () => {
        loadLocaleLanguage();
    };
    useEffect(() => {
        addMenuClearAsyncStorage();
        getCodePushInfo();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate loading={<ActivityIndicator />} persistor={persistor} onBeforeLift={onBeforeLift}>
                    <RootSiblingParent>
                        <NavigationContainer ref={navigationRef}>
                            <Navigation />
                        </NavigationContainer>
                    </RootSiblingParent>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
};

export default App;
