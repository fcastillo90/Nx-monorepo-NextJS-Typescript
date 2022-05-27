import PreviewCard from './PreviewCard'
import * as moviePopular from '@/mocks/moviePopular.json'
import * as movieToprated from '@/mocks/movieToprated.json'
import * as genreMovieList from '@/mocks/genreMovieList.json'
import * as movieIdVideos from '@/mocks/movieIdVideos.json'
import { CategoryType } from '@/types'
import {createMemoryHistory} from 'history'
import { Router } from 'react-router-dom'
import { render, screen, within } from '@/store/testUtils'

const movie = moviePopular.results[0]

describe('PreviewCard', () => {
  it('Renders correctly', async () => {
    const history = createMemoryHistory()
    const handleMoreInfo = jest.fn((id: number) => {})
    
    render(
      <Router location={history.location} navigator={history}>
        <PreviewCard 
          data={movie as any}
          category={CategoryType.MOVIE}
          handleMoreInfo={handleMoreInfo}
          isActive={true}
        />
      </Router>,
      { 
        preloadedState: {
          "movieApi": {
              "queries": {
                  "getPopularMovies(null)": {
                      "status": "fulfilled",
                      "endpointName": "getPopularMovies",
                      "requestId": "cwJuU9h9LWrsXOtosUCiu",
                      "originalArgs": null,
                      "startedTimeStamp": 1652874719176,
                      "data": moviePopular,
                      "fulfilledTimeStamp": 1652874719862
                  },
                  "getTopRatedMovies(null)": {
                      "status": "fulfilled",
                      "endpointName": "getTopRatedMovies",
                      "requestId": "Ev-0fo9L9iKQW3ub4tn4C",
                      "originalArgs": null,
                      "startedTimeStamp": 1652874719177,
                      "data": movieToprated,
                      "fulfilledTimeStamp": 1652874719518
                  },
                  "getGenreList(null)": {
                      "status": "fulfilled",
                      "endpointName": "getGenreList",
                      "requestId": "7PJo0RoyKWcH4_JUyPt2-",
                      "originalArgs": null,
                      "startedTimeStamp": 1652874719178,
                      "data": genreMovieList,
                      "fulfilledTimeStamp": 1652874719810
                  },
                  "getMovieVideos(675353)": {
                      "status": "fulfilled",
                      "endpointName": "getMovieVideos",
                      "requestId": "rORZv9alk-BH8Hc7PvyTg",
                      "originalArgs": 675353,
                      "startedTimeStamp": 1652874719972,
                      "data": movieIdVideos,
                      "fulfilledTimeStamp": 1652874720458
                  },
                  "getMovieDetail(19404)": {
                      "status": "fulfilled",
                      "endpointName": "getMovieDetail",
                      "requestId": "1rchrvYPcARkAdsewXhtU",
                      "originalArgs": 19404,
                      "startedTimeStamp": 1652887146632,
                      "data": {},
                      "fulfilledTimeStamp": 1652887147223
                  },
                  "getMovieVideos(19404)": {
                      "status": "fulfilled",
                      "endpointName": "getMovieVideos",
                      "requestId": "DfLs7zNYJpEYoALvmwzya",
                      "originalArgs": 19404,
                      "startedTimeStamp": 1652887146634,
                      "data": {},
                      "fulfilledTimeStamp": 1652887147417
                  }
              },
              "mutations": {},
              "provided": {},
              "subscriptions": {
                  "getPopularMovies(null)": {
                      "cwJuU9h9LWrsXOtosUCiu": {
                          "pollingInterval": 0
                      }
                  },
                  "getTopRatedMovies(null)": {
                      "Ev-0fo9L9iKQW3ub4tn4C": {
                          "pollingInterval": 0
                      }
                  },
                  "getGenreList(null)": {
                      "7PJo0RoyKWcH4_JUyPt2-": {
                          "pollingInterval": 0
                      }
                  },
                  "getMovieVideos(675353)": {
                      "7RGyH_hpAiaTj-RocCzlV": {
                          "pollingInterval": 0
                      }
                  },
                  "getMovieDetail(19404)": {},
                  "getMovieVideos(19404)": {}
              },
              "config": {
                  "online": true,
                  "focused": false,
                  "middlewareRegistered": true,
                  "refetchOnFocus": false,
                  "refetchOnReconnect": false,
                  "refetchOnMountOrArgChange": false,
                  "keepUnusedDataFor": 60,
                  "reducerPath": "movieApi"
              }
          },
          "serieApi": {
              "queries": {},
              "mutations": {},
              "provided": {},
              "subscriptions": {},
              "config": {
                  "online": true,
                  "focused": false,
                  "middlewareRegistered": true,
                  "refetchOnFocus": false,
                  "refetchOnReconnect": false,
                  "refetchOnMountOrArgChange": false,
                  "keepUnusedDataFor": 60,
                  "reducerPath": "serieApi"
              }
          },
          "configApi": {
              "queries": {},
              "mutations": {},
              "provided": {},
              "subscriptions": {},
              "config": {
                  "online": true,
                  "focused": false,
                  "middlewareRegistered": true,
                  "refetchOnFocus": false,
                  "refetchOnReconnect": false,
                  "refetchOnMountOrArgChange": false,
                  "keepUnusedDataFor": 60,
                  "reducerPath": "configApi"
              }
          },
          "modal": {
              "isOpen": false,
              "id": false,
              "category": false
          },
          "config": {
              "navbar": {
                  "isVisible": true
              }
          }
        }
      }
    )

    expect(screen.queryByText('99% Match')).toBeTruthy()
    const { getByText } = within(screen.queryByTestId('preview-card-genres') as HTMLElement)
    getByText((content, node) => content === 'ActionScience FictionComedyFamilyAdventure')
  })
})