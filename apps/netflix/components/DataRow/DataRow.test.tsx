import React from 'react'
import {render, screen} from '@testing-library/react'
import DataRow from './index'
import { CategoryType, MovieList } from '@/types'
import * as moviePopular from '@/mocks/moviePopular.json'

describe('DataRow', () => {
  it('Should display DataRow', () => {
    render(<DataRow 
      category={CategoryType.MOVIE} 
      data={moviePopular as any} 
      title={'title'} 
    />)
  })
})