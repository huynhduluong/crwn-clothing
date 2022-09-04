import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddlewares = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddlewares
].filter(Boolean);

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddlewares.run(rootSaga)

export const persistor = persistStore(store)