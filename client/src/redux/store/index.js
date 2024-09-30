import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice';
import themeReducer from '../slices/themeSlice';
import { authApi, userApi, adminApi, blogApi } from '../../api';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(adminApi.middleware)
      .concat(blogApi.middleware),
});

export const persistor = persistStore(store);
