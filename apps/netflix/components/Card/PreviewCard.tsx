import * as React from 'react';
import Typography from '@mui/material/Typography';
import { CategoryType, Genre, Movie, Serie } from '@fcastillo90/types';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {theme, ButtonGroup} from '@fcastillo90/netflix-ui';
// import { useNavigate } from 'react-router-dom';

interface PreviewCardProps {
  data: Movie | Serie;
  category: CategoryType;
  isActive: boolean;
  handleMoreInfo?: (movieId: number) => void;
}

const PreviewCard = (props: PreviewCardProps) => {
  const { category, data, isActive, handleMoreInfo } = props;
  // const navigate = useNavigate()

  const dataApi: any = useSelector((state: RootState) => state[category]?.queries['getGenreList(null)']?.data);

  const getGenres = (genresIds: number[]) =>
    genresIds.map((id) => 
      dataApi?.genres.find((genre: Genre) => genre.id === id))

  const handleWatch = () => {
    // navigate(`/watch/${category[0]}/${data.id}`)
  }

  return (
      
    <div 
      data-testid="preview-card"
      style={{
        display: isActive ? 'block' : 'none',
        padding: 16
      }}
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

      {isActive && <Typography variant="body2" color="text" data-testid="preview-card-genres">
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
    </div>
  );
}

export default PreviewCard;