import { GenreList, SerieDetail, SerieList, GetVideos } from '@fcastillo90/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import prepareHeaders from '../apiPrepareHeaders'

// Define a service using a base URL and expected endpoints
export const serieApi = createApi({
  reducerPath: 'serieApi',
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
    getSerieGenreList: builder.query<GenreList, null>({
      query: () => `/genre/tv/list`,
    }),
    getSerieDetail: builder.query<SerieDetail, number>({
      query: (id) => `/tv/${id}`,
    }),
    getPopularSerie: builder.query<SerieList, null>({
      query: () => `/tv/popular`,
    }),
    getSerieVideos: builder.query<GetVideos, number>({
      query: (id) => `/tv/${id}/videos`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetSerieGenreListQuery,
  useGetSerieDetailQuery,
  useGetPopularSerieQuery,
  useGetSerieVideosQuery,
  util: { getRunningOperationPromises },
} = serieApi

export const {
  getSerieGenreList,
  getSerieDetail,
  getPopularSerie,
  getSerieVideos
} = serieApi.endpoints;