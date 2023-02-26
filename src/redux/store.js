import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducer/user';
import authReducer from './reducer/authorisation';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import cartReducer from './reducer/cartSlice';


const reducer = combineReducers({
    snapdeal_user : userReducer,
    snapdeal_authorised : authReducer,
    cart: cartReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig,reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;