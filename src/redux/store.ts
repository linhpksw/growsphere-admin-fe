import { combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    Persistor,
} from 'redux-persist';
import { configureStore as configureStoreRTK } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import categorySlice from './slices/categorySlice';
import sellSummariesSlice from './slices/sellSummariesSlice';
import recentClientSlice from './slices/allApiSlice';

const createNoopStorage = () => ({
    getItem(_key: string) {
        return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
        return Promise.resolve(value);
    },
    removeItem(_key: string) {
        return Promise.resolve();
    },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        categories: categorySlice,
        sellSummaries: sellSummariesSlice,
        recentClients: recentClientSlice,
    })
);

const store = configureStoreRTK({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppPersistor = Persistor;

export const persistor = persistStore(store);
export default store;
