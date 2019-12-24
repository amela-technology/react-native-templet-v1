"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_1 = require("@react-native-community/async-storage");
var redux_1 = require("redux");
var redux_logger_1 = require("redux-logger");
var redux_persist_1 = require("redux-persist");
var rootReducer_1 = require("./rootReducer");
// persitsInit
var persistConfig = {
    blacklist: ["AlertReducer"],
    key: "amela@2019",
    debug: __DEV__,
    storage: async_storage_1.default,
};
// const sagaMiddleware: any = createSagaMiddleware()
//
var middleware = [];
if (__DEV__) {
    middleware.push(redux_logger_1.default);
}
var reducer = redux_persist_1.persistReducer(persistConfig, rootReducer_1.default);
var store = redux_1.createStore(reducer, redux_1.compose(redux_1.applyMiddleware.apply(void 0, middleware)));
exports.store = store;
var persistor = redux_persist_1.persistStore(store);
exports.persistor = persistor;
