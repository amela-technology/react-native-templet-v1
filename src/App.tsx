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
import APIProvider from 'utilities/context/APIProvider';
import { addMenuClearAsyncStorage, getCodePushInfo } from 'utilities/helper';

LogBox.ignoreLogs(['Require cycle:']);

const App: FunctionComponent = () => {
    const onBeforeLift = () => {
        loadLocaleLanguage();
    };
    useEffect(() => {
        addMenuClearAsyncStorage();
        getCodePushInfo();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor} onBeforeLift={onBeforeLift}>
                <APIProvider>
                    <RootSiblingParent>
                        <NavigationContainer ref={navigationRef}>
                            <Navigation />
                        </NavigationContainer>
                    </RootSiblingParent>
                </APIProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
