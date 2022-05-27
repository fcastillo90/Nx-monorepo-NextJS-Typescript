import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import { configSlice } from './features/configSlice';
import { modalSlice } from './features/modalSlice';
import { configApi } from './services/ApiConfigSlice';
import { movieApi } from './services/ApiMovieSlice';
import { serieApi } from './services/ApiSerieSlice';

const middleware = process.env.NODE_ENV === 'development' ? [logger] : [];

export const store = () => configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [serieApi.reducerPath]: serieApi.reducer,
    [configApi.reducerPath]: configApi.reducer,
    modal: modalSlice.reducer,
    config: configSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    movieApi.middleware, 
    serieApi.middleware, 
    configApi.middleware, 
    ...middleware
  ),
})

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(store, { debug: true })