import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {
  applyMiddleware,
  combineReducers,
  compose,
  Dispatch,
  MiddlewareAPI,
} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {RootAction} from './types/actions';
import {authReducer} from 'src/modules/auth/reducer';
import {userReducer} from 'src/modules/user/reducer';

/*
 *--------------------------------------------------*
 * Persist config documentation
 * https://github.com/rt2zz/redux-persist/blob/master/src/types.js#L13-L27
 *--------------------------------------------------*
 */

const authPersistConfig = {
  storage: AsyncStorage,
  key: 'auth',
};

const userPersistConfig = {
  storage: AsyncStorage,
  key: 'user',
  blacklist: ['password'],
};

export const reducers = {
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
};

export const rootReducer = combineReducers(reducers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appMiddleware =
  (_store: MiddlewareAPI) => (next: Dispatch) => (action: RootAction) => {
    //   var state = store.getState()
    //   switch (action.type) {
    //     case actions.ADD_TASK:
    //       *do something*
    //       break;
    //   }
    next(action);
  };

const middlewares = [appMiddleware];
// @ts-ignore
const enhancers = [applyMiddleware(...middlewares)];

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  enhancers: compose(...enhancers) as ConfigureStoreOptions['enhancers'],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

/*
 *--------------------------------------------------*
 * Reset persist store: persistor.purge()
 *--------------------------------------------------*
 */

export const deletePersistedData = async () => {
  persistor.pause();
  persistor.flush().then(() =>
    persistor.purge());
};
