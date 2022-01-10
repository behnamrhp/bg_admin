import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userReducer from './../slices/userSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sliderApi } from '../fetches/slider';

const reducers = combineReducers({
    user   : userReducer,
    [ sliderApi.reducerPath ] : sliderApi.reducer 
})

//persist data
const persistConfigs = {
  key : 'bg_d',
  storage,
  whitelist : ['user'],
  blacklist : ['slider']
}

const persistedReducers = persistReducer(persistConfigs, reducers);

export const store = configureStore({
    // reducer : {
    //     [ userApi.reducerPath ] : userApi.reducer
    // },
    reducer    : persistedReducers,
    middleware : (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck : {
            ignoredActions : [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }).concat(sliderApi.middleware)
    }        
    // middleware : (getDefaultMiddleware) => {
    //     return getDefaultMiddleware().concat(userApi.middleware)
    // }        
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
