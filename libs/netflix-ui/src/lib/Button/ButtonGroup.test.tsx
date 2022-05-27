import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonGroup from './ButtonGroup'
import * as moviePopular from '@/mocks/moviePopular.json'

const movie = moviePopular.results[0]

describe('ButtonGroup', () => {
  it('Should trigger button actions', async () => {
    const user = userEvent.setup()
    const handleMoreInfo = jest.fn(() => {});
    const handleWatch = jest.fn(() => {});
    render(<ButtonGroup 
      movie={movie as any}
      isLarge={false}
      handleMoreInfo={handleMoreInfo}
      handleWatch={handleWatch}
    />)

    await user.click(screen.getByTestId('button-group-play'))
    expect(handleWatch.mock.calls.length).toBeTruthy()

    await user.click(screen.getByTestId('button-group-info'))
    expect(handleMoreInfo.mock.calls.length).toBeTruthy()

    expect(screen.queryByTestId('button-group-volume')).toBeNull()
  })

  it('Should render large buttons', async () => {
    const user = userEvent.setup()
    const handleMoreInfo = jest.fn(() => {});
    const handleWatch = jest.fn(() => {});
    render(<ButtonGroup 
      movie={movie as any}
      isLarge={true}
      handleMoreInfo={handleMoreInfo}
      handleWatch={handleWatch}
    />)

    await user.click(screen.getByTestId('button-group-play'))
    expect(handleWatch.mock.calls.length).toBeTruthy()

    expect(screen.getByTestId('button-group-volume')).toBeTruthy()

    expect(screen.queryByTestId('button-group-info')).toBeNull()
  })
})