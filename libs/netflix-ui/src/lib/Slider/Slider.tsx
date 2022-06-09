import { useCallback, useMemo, useRef, useState } from 'react'
import { GenreList, Movie, Serie } from '@fcastillo90/types'
import { ButtonSliderPrev, ButtonSliderNext, Card } from '@fcastillo90/netflix-ui';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '@fcastillo90/constants';
import { styled } from '@mui/material';

export interface SliderProps {
  data: Movie[] | Serie[];
  genreList: GenreList;
  handleDetailModal: (index: number) => void;
  isLarge: boolean;
  isTopTen: boolean;
  slug: string;
}

interface ContainerProps {
  isLarge: boolean;
  isTopTen: boolean;
}

const Container = styled('div')<ContainerProps>`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-flow: row;
  padding-right: 20px;
  padding-left: 56px;
  align-items: center;
  align-content: stretch;
  scrollbar-width: none;
  scroll-behavior: smooth;
  padding-left: 56px;
  height: ${({isLarge, isTopTen}) => isLarge ?
          SLIDE_HEIGHT * 4.75
          :
          isTopTen ? SLIDE_HEIGHT * 3.2 : SLIDE_HEIGHT * 2.7}px;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Slider = (props: SliderProps) => {
  const { slug, data, isLarge, genreList, isTopTen, handleDetailModal } = props
  const [isPrevVisible, setPrevVisible] = useState(false)
  const [isNextVisible, setNextVisible] = useState(true)
  const [containerWidth, setContainerWidth] = useState(0)
  const sliderContainer = useRef<HTMLDivElement | null>(null)

  const getSlideAmount = useMemo(() => {
    return Math.floor(
      isLarge && isTopTen ?
        containerWidth / (SLIDE_WIDTH * 2 + 20)
        :
        containerWidth / (SLIDE_WIDTH + 10)
    ) * (SLIDE_WIDTH + 10)
  }, [containerWidth, isLarge, isTopTen])


  const handleClick = (index: number, movieId: number) => {
    if (isTopTen && handleDetailModal) return handleDetailModal(movieId)
  }
  
  const handlePrev = () => {
    if (sliderContainer.current) {
      sliderContainer.current.scrollLeft -= getSlideAmount

      setNextVisible(true)
      if (sliderContainer.current?.scrollLeft - getSlideAmount <= 0) {
        return setPrevVisible(false)
      }
      setPrevVisible(true)
    }
  }

  const handleNext = () => {
    if (sliderContainer.current) {
      sliderContainer.current.scrollLeft += getSlideAmount

      if (sliderContainer.current?.scrollLeft + getSlideAmount >= sliderContainer.current?.scrollWidth - sliderContainer.current?.clientWidth) {
        setNextVisible(false)
      }
      setPrevVisible(true)
    }
  }

  const dataToRender = useMemo(() => isTopTen ? data.slice(0, 10) : data, [data, isTopTen])

  const onRefChange = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setContainerWidth(node.clientWidth)
      sliderContainer.current = node
    }
  }, []);

  return (
    <Container
      className="sliderContainer"
      // onScroll={dismissHover}
      ref={onRefChange}
      isLarge={isLarge}
      isTopTen={isTopTen}
    >
      <ButtonSliderPrev
        handlePrev={handlePrev}
        isLarge={isLarge}
        isPrevVisible={isPrevVisible}
        isTopTen={isTopTen}
      />
      <ButtonSliderNext
        handleNext={handleNext}
        isLarge={isLarge}
        isNextVisible={isNextVisible}
        isTopTen={isTopTen}
      />

      {dataToRender.map((data, index) => {
        const lastInTopTen = index === 9
        return (
          <Card
            data={data}
            genreList={genreList}
            handleClick={handleClick}
            handleMoreInfo={handleDetailModal}
            handleWatch={() => {}}
            index={index}
            isLarge={isLarge}
            isTopTen={isTopTen}
            key={data.id + slug}
            lastInTopTen={lastInTopTen}
          />
        )
      })}
    </Container>
  )
}

export default Slider