import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { GradientBottom, YoutubeEmbed, getImgUrl, getHeight16by9, useVideoHook } from '@fcastillo90/netflix-ui'
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useEffect } from "react";
import { CategoryType, Video } from "@fcastillo90/types";
// import { useGetSerieVideosQuery } from "@/store/services/ApiSerieSlice";
// import { useGetMovieVideosQuery } from "@/store/services/ApiMovieSlice";

export interface BillboardProps {
  category: CategoryType;
  handleMoreInfo: (id: number, category: CategoryType) => void;
  id: number;
  image: string;
  isModalOpen: boolean;
  overview: string;
  title: string;
  videoData: Video[];
}

export const Billboard = (props: BillboardProps) => {
  const { videoData, category, id, title, image, overview, isModalOpen, handleMoreInfo } = props;
  // const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)
  const [playerRef, containerRef, handlePlay, handlePause] = useVideoHook();
  const theme = useTheme();
  const { width } = useWindowDimensions()
  const isViewMdUp = useMediaQuery(theme.breakpoints.up('md'));
  
  const height = isViewMdUp ? width * 0.5625 : width * 0.4

  // const getData = () => {
  //   if (category === CategoryType.MOVIE) return useGetMovieVideosQuery(id)
  //   return useGetSerieVideosQuery(id)
  // }
  
  // const handleMoreInfo = () => {
  //   dispatch(openModal({
  //     id,
  //     category,
  //   }))
  // }

  const handleWatch = () => {
    // navigate(`/watch/${category[0]}/${id}`)
  }

  const video = videoData?.find((result) => result.site === 'YouTube')

  useEffect(() => {
    if (isModalOpen) handlePause(true)
    else handlePlay(false)
  }, [isModalOpen])
  return (
    <>
      <div 
        data-testid="billboard-img-video-container"
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: -1,
          overflow: 'hidden',
          height: isViewMdUp ? "56.25vw" : "40vw",
          minHeight: getHeight16by9(height),
        }}
      >
        <GradientBottom />
        {video && video.key &&
          <div 
            data-testid="billboard-video-container"
            ref={containerRef}
          >
            <YoutubeEmbed
              id={video.key}
              width={width}
              height={height + 320}
              margin='-160px 0 0 0'
              ref={playerRef}
            />
          </div>
        }
        {image && <img
          data-testid="billboard-img"
          src={getImgUrl(image, 'original')}
          alt={title}
          style={{
            width: '100%'
          }}
        />}
      </div>
      <Container
        data-testid="billboard-info-container"
        disableGutters
        maxWidth={false}
        style={{
          paddingLeft: '3.5rem',
          paddingRight: '3.5rem',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            height: isViewMdUp ? "44vw" : "30vw",
            minHeight: getHeight16by9(height),
          }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 28,
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              {/* <img
                src={NetflixLogo}
                alt="Netflix"
                style={{
                  height: 24,
                  marginRight: 6
                }}
              /> */}
              <h3 style={{ color: "rgba(255,255,255,0.7" }}>
                {category === CategoryType.MOVIE ? 'FILM' : 'SERIE'}
              </h3>
            </div>
            <Typography variant="h3" component="h2" style={{ margin: 0, textAlign: 'center' }}>{title}</Typography>
            <Typography
              variant="body1"
              paragraph={true}
              noWrap={true}
            >
              {overview}
            </Typography>
            <Button
              data-testid="billboard-info-button-play"
              variant="contained"
              style={{
                backgroundColor: "white",
                marginRight: 8,
                color: 'black'
              }}
              onClick={handleWatch}
            >
              <PlayArrowRoundedIcon fontSize="large" style={{ marginRight: 2 }} /> Play
            </Button>
            <Button
              data-testid="billboard-info-button-more-info"
              onClick={() => handleMoreInfo(id, category)}
              variant="contained"
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                color: 'black'
              }}
            >
              <InfoOutlinedIcon fontSize="large" style={{ marginRight: 6 }} /> More Info
            </Button>
          </Grid>

          <Grid item xs></Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Billboard