// jest.useFakeTimers()
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { store } from '@/store';
import { CategoryType } from '@/types'
import Billboard from './index'
import ModalContainer from '../Modal';
import * as moviePopular from '@/mocks/moviePopular.json'
import {createMemoryHistory} from 'history'

const {id, title, backdrop_path, overview } = moviePopular.results[0]

describe('Billboard', () => {
  it('should render Billboard', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Billboard 
            category={CategoryType.MOVIE}
            id={id}
            image={backdrop_path}
            overview={overview}
            title={title}
          />
        </Provider>
      </MemoryRouter>
    )
    expect(screen.queryByTestId('billboard-info-container')).toBeTruthy()
    expect(screen.queryByTestId('billboard-img-video-container')).toBeTruthy()
    expect(screen.queryByText(title)).toBeTruthy()
    expect(screen.queryByText(overview)).toBeTruthy()
    expect(screen.queryByTestId('billboard-img')).toHaveProperty('alt', title)
    expect(screen.queryByTestId('billboard-img')).toHaveProperty('src', `http://localhost/undefined/original${backdrop_path}`)
    expect(screen.queryByTestId('billboard-info-button-play')).toBeTruthy()
    expect(screen.queryByTestId('billboard-info-button-more-info')).toBeTruthy()
    await waitFor(() => {
      expect(screen.queryByTestId('billboard-video-container')).toBeTruthy()
    })
  })
  
  it('should trigger Billboard actions', async () => {
    const {container} = render(
      <MemoryRouter>
        <Provider store={store}>
          <Billboard 
            category={CategoryType.MOVIE}
            id={id}
            image={backdrop_path}
            overview={overview}
            title={title}
          />
          <ModalContainer />
        </Provider>
      </MemoryRouter>
    )

    const portal = document.createElement('div')
    portal.setAttribute('id', 'portal')
    container.appendChild(portal)

    fireEvent.click(screen.getByTestId('billboard-info-button-more-info'))
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).toBeTruthy()
    })
  })
  
  it('should trigger Billboard navigation', async () => {
    const history = createMemoryHistory()
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Billboard 
            category={CategoryType.MOVIE}
            id={id}
            image={backdrop_path}
            overview={overview}
            title={title}
          />
        </Provider>
      </Router>
    )
    expect(history.location.pathname).toBe('/')
    const user = userEvent.setup()
    await user.click(screen.getByTestId('billboard-info-button-play'))
    expect(history.location.pathname).toBe(`/watch/m/${id}`)
  })
})