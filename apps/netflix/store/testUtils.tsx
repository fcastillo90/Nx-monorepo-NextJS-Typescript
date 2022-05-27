import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { configSlice } from './features/configSlice'
import { modalSlice } from './features/modalSlice'
import { configApi } from './services/ApiConfigSlice'
import { movieApi } from './services/ApiMovieSlice'
import { serieApi } from './services/ApiSerieSlice'

function render(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    preloadedState,
    store = configureStore({ reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
      [serieApi.reducerPath]: serieApi.reducer,
      [configApi.reducerPath]: configApi.reducer,
      modal: modalSlice.reducer,
      config: configSlice.reducer
    }, preloadedState }),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }