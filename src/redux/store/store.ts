import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userReducer from './../slices/userSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sliderApi } from '../fetches/slider';
import { postApi } from '../fetches/post';
import { userApi } from '../fetches';
import { skillsApi } from '../fetches/skills';

const reducers = combineReducers({
    user   : userReducer,
    [ sliderApi.reducerPath ] : sliderApi.reducer,
    [ postApi.reducerPath ]   : postApi.reducer,
    [ userApi.reducerPath ]   : userApi.reducer,
    [ skillsApi.reducerPath ] : skillsApi.reducer
})

//persist data
const persistConfigs = {
  key : 'bg_d',
  storage,
  whitelist : ['user'],
  blacklist : ['slider', 'post', 'users', 'skills']
}

const persistedReducers = persistReducer(persistConfigs, reducers);

export const store = configureStore({
    reducer    : persistedReducers,
    middleware : (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck : {
            ignoredActions : [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }).concat(sliderApi.middleware).concat(postApi.middleware).concat(userApi.middleware)
    }     
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