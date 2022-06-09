import React from 'react'
import {render, screen} from '@testing-library/react'
import DataRow from './DataRow'
import { CategoryType } from '@fcastillo90/types'
import { moviePopular } from '@fcastillo90/mock'

describe('DataRow', () => {
  it('Should display DataRow', () => {
    render(<DataRow 
      category={CategoryType.MOVIE} 
      data={moviePopular as any} 
      title={'title'} 
    />)
  })
})