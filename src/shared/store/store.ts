import AsyncStorage from '@react-native-community/async-storage'
import {applyMiddleware, compose, createStore} from 'redux'
import logger from 'redux-logger'
import {persistReducer, persistStore} from 'redux-persist'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

// persitsInit
const persistConfig = {
    blacklist: ['AlertReducer'],
    key: 'amela@2019',
    debug: __DEV__,
    storage: AsyncStorage,
}

// const sagaMiddleware: any = createSagaMiddleware()
//
const middleware = []

if (__DEV__) {
    middleware.push(logger)
}

const reducer = persistReducer(persistConfig, rootReducer)

const store = createStore(reducer, compose(applyMiddleware(...middleware)))

const persistor = persistStore(store)

// sagaMiddleware.run(rootSaga)

export {store, persistor}
