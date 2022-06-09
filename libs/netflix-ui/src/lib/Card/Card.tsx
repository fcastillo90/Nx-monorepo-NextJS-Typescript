import styled from '@emotion/styled';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '@fcastillo90/constants';
import { getImgUrl, Image, Preview, theme } from '@fcastillo90/netflix-ui';
import { GenreList, Movie, Serie } from '@fcastillo90/types';
import { Typography } from '@mui/material';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface CardProps {
  isLarge: boolean;
  isTopTen: boolean;
  handleClick: (index: number, id: number) => void;
  handleMoreInfo: (index: number) => void;
  handleWatch: () => void;
  index: number;
  data: Movie | Serie;
  lastInTopTen: boolean;
  genreList: GenreList;
}

interface StyledCardProps {
  isLarge: boolean;
  isTopTen: boolean;
  isActive: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  transition: all 0.3s ease-in-out;
  flex: 1 0 auto;
  width: ${SLIDE_WIDTH}px;
  margin-right: 10px;
  z-index: 0;
  overflow: hidden;
  height: ${({isLarge}) => isLarge ? SLIDE_HEIGHT * 3 : SLIDE_HEIGHT }px;
  ${({isActive}) => isActive && `
    background-color: ${theme.palette.background.paper};
    overflow: none;
    z-index: 9;
    margin-top: -72px;
    align-self: flex-end;
    float: left;
    width: 312px;
    height: auto;
  `};
  ${({isTopTen, isLarge}) => isTopTen && `
    text-align: right;
    width: ${SLIDE_WIDTH}px;
    height: ${SLIDE_HEIGHT * 1.5}px;
    ${isLarge && `
      width: ${SLIDE_WIDTH * 2 + 10}px;
      height: ${SLIDE_HEIGHT * 3}px;
    `}
  `}
`

interface StyledTypographyProps {
  lastInTopTen: boolean
  isLarge: boolean
}

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  position: absolute;
  width: min-content;
  letter-spacing: -${SLIDE_WIDTH / 4.3}px;
  right: ${({lastInTopTen}) => lastInTopTen ? SLIDE_WIDTH / 2.5 : SLIDE_WIDTH / 2}px;
  color: black;
  text-shadow: 3px 3px 0 ${theme.palette.secondary.light}, 
    -3px -3px 0 ${theme.palette.secondary.light}, 
    3px -3px 0 ${theme.palette.secondary.light}, 
    -3px 3px 0 ${theme.palette.secondary.light}, 
    3px 3px 0 ${theme.palette.secondary.light};
  font-size: ${SLIDE_HEIGHT * 2}px;
  z-index: -1;
  line-height: 0.78;
  ${({isLarge, lastInTopTen}) => isLarge && `
    font-size: ${SLIDE_HEIGHT * 4}px;
    letter-spacing: -${SLIDE_WIDTH / 2.15}px;
    right: ${lastInTopTen ? SLIDE_WIDTH / 1.1 : SLIDE_WIDTH}px;
  `};
`

export function Card(props: CardProps) {
  const { isLarge, isTopTen, handleClick, index, data, lastInTopTen, genreList, handleMoreInfo, handleWatch } = props;
  const [hover, setHover] = useState(false);
  let timer: NodeJS.Timeout;

  const handleHover = (index: number) => {
    if (!isTopTen) {
      handleClearTimer();
      timer = setTimeout(() => {
        setHover(true)
      }, 200);
    }
  }

  const dismissHover = () => {
    setHover(false)
    handleClearTimer();
  }
  const handleClearTimer = () => clearTimeout(timer);

  return (
    <StyledCard
      isLarge={isLarge}
      isTopTen={isTopTen}
      isActive={hover}
      onClick={() => handleClick(index, data.id)}
      onMouseEnter={() => { handleHover(index) }}
      onMouseLeave={dismissHover}
    >
      {isTopTen && (
        <StyledTypography
          isLarge={isLarge}
          lastInTopTen={lastInTopTen}
        >
          {index + 1}
        </StyledTypography>
      )}
      <Image
        src={getImgUrl(isLarge || isTopTen ? data.poster_path : data.backdrop_path, 'w500')}
        alt={(data as Movie).title || (data as Serie).name}
        style={{
          objectFit: 'contain',
          width: isTopTen ? '50%' : '100%',
        }}
      />
      <Preview
        isActive={hover}
        data={data}
        handleWatch={handleWatch}
        handleMoreInfo={handleMoreInfo}
        genreList={genreList}
      />
    </StyledCard>
  );
}

export default Card;
