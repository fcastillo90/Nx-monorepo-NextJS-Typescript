import styled from '@emotion/styled';
import { ButtonGroup, theme } from '@fcastillo90/netflix-ui';
import { Genre, GenreList, Movie, Serie } from '@fcastillo90/types';
import { Typography } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import React from 'react';

export interface PreviewProps {
  isActive: boolean;
  handleWatch: () => void;
  handleMoreInfo: (movieId: number) => void;
  data: Movie | Serie;
  genreList: GenreList;
}
interface StyledPreviewProps {
  isActive: boolean;
}
const StyledPreview = styled.div<StyledPreviewProps>`
  display: ${({isActive}) => isActive ? 'block' : 'none'};
  padding: 16px;
`;

export function Preview(props: PreviewProps) {
  const { isActive, handleWatch, handleMoreInfo, data, genreList } = props;
  const getGenres = (genresIds: number[]) =>
    genresIds.map((id) => 
      genreList?.genres.find((genre: Genre) => genre.id === id))
  return (
    <StyledPreview 
      data-testid="preview-card"
      isActive={isActive}
    >
      <ButtonGroup
        data-testid="preview-card-button-group"
        handleWatch={handleWatch}
        handleMoreInfo={handleMoreInfo}
        movie={data}
      />
      <div>
        <Typography color="lightgreen" style={{marginTop:16, fontWeight: 700}}>
          99% Match
        </Typography>
      </div>

      {isActive && <Typography variant="body2" style={{color: 'white'}} data-testid="preview-card-genres">
        {getGenres(data.genre_ids).map((genre, index) => {
          return <React.Fragment key={genre?.id}>
            {genre?.name}
            {index !== data.genre_ids.length - 1 && <CircleRoundedIcon 
              style={{
                fontSize: 6,
                marginLeft: 6,
                marginRight: 6,
                marginBottom: 2,
                color: theme.palette.secondary.light,
              }} 
            />}
          </React.Fragment>
        })}
      </Typography>}
    </StyledPreview>
  );
}

export default Preview;
