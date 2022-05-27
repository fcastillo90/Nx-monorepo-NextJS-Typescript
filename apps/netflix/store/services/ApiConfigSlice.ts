import { ConfigAPI } from '@fcastillo90/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import prepareHeaders from '../apiPrepareHeaders'
import { HYDRATE } from 'next-redux-wrapper'

// Define a service using a base URL and expected endpoints
export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NX_THEMOVIEDB_API_URL,
    prepareHeaders
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: (builder) => ({
    getApiConfiguration: builder.query<ConfigAPI, null>({
      query: () => `/configuration`,
    }),
    getPrimaryTranslations: builder.query<string[], null>({
      query: () => `/configuration/primary_translations`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetApiConfigurationQuery,
  useGetPrimaryTranslationsQuery,
  util: { getRunningOperationPromises },
} = configApi

export const { 
  getApiConfiguration, 
  getPrimaryTranslations 
} = configApi.endpoints;