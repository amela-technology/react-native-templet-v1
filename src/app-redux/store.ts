import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import resourceReducer from './slices/resourceSlice';
import userInfoReducer from './slices/userInfoSlice';
import languageReducer from './slices/languageSlice';

const rootReducer = {
    resource: resourceReducer,
    userInfo: userInfoReducer,
    languageKey: languageReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            // .concat(logger)
            .prepend(sagaMiddleware),
    devTools: __DEV__,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
