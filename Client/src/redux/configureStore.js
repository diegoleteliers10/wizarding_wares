import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Elige el almacenamiento que prefieras (por ejemplo, local storage)
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import adminReducer from './adminSlice';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});
  
export const persistor = persistStore(store);
  
export default { store, persistor };
  