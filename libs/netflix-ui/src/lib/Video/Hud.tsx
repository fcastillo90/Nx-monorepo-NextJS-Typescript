import { useEffect, useState } from 'react';
import { IconButton, Slider, Typography } from "@mui/material"
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Replay10RoundedIcon from '@mui/icons-material/Replay10Rounded';
import Forward10RoundedIcon from '@mui/icons-material/Forward10Rounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import { Video } from '@fcastillo90/types';
import Volume from '../Button/Volume';
import { theme, getFormattedDuration } from '@fcastillo90/netflix-ui';

export interface HudProps {
  data: Video;
  duration: number;
  handlePause: () => void;
  handlePlay: () => void;
  handleSeek: (value: number) => void;
  handleVolume: (value: number) => void;
  handleGetCurrentTime: () => number;
  handleGoBack: () => void;
  handleFullscreen: (e: any) => void;
}

const fontSize = 60

const Hud = (props: HudProps) => {
  const {
    data, 
    duration, 
    handleFullscreen,
    handleGetCurrentTime, 
    handleGoBack, 
    handlePause, 
    handlePlay, 
    handleSeek, 
    handleVolume, 
  } = props
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  let timer: NodeJS.Timeout
  let timerHud: NodeJS.Timeout

  const handleBack = (e: any) => {
    e.stopPropagation()
    handleGoBack()
  }
  const onPlay = () => {
    setPaused(false)
    handlePlay()
  }
  const onPause = () => {
    setPaused(true)
    handlePause()
  }
  const onSeek = (e: any, newValue: number | number[]) => {
    setPosition(newValue as number)
    handleSeek(newValue as number)
    e.stopPropagation()
  }
  const handlePlayPause = (e: any) => {
    e.stopPropagation()
    if (paused) return onPlay()
    return onPause()
  }
  const handleRewind = (e: any, value: number) => {
    let newPosition = position - value
    if (newPosition < 0) newPosition = 0
    setPosition(newPosition)
    handleSeek(newPosition)
    e.stopPropagation()
  }
  const handleForward = (e: any, value: number) => {
    let newPosition = position + value
    if (newPosition > duration) newPosition = duration
    setPosition(newPosition)
    handleSeek(newPosition)
    e.stopPropagation()
  }
  const handleMouseOverHud = (e: any) => {
    clearTimeout(timerHud)
    e.target.style.opacity = '1'

    timerHud = setTimeout(() => {
      e.target.style.opacity = '0'
    }, 1000)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!paused) setPosition(Math.ceil(handleGetCurrentTime()))
    }, 1000);
    return () => clearTimeout(timeout);
  }, [position, paused])

  useEffect(() => {
    clearTimeout(timer)
    const playPauseIcon = document.getElementById('play-pause-icon')
    if (playPauseIcon) {
      playPauseIcon.style.opacity = '1'
      timer = setTimeout(() => {
        playPauseIcon.style.opacity = '0'
      } , 1000);
    }
    return () => clearTimeout(timer);
  }, [paused])

  return (
    <div
      id='hud-player'
      onMouseMove={handleMouseOverHud}
      onClick={handlePlayPause}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        opacity: 0,
        transition: 'opacity 0.3s linear'
      }}
    >
      <IconButton 
        aria-label="back"
        onClick={handleBack}
        style={{
          position: 'absolute',
          color: 'white',
          top: 16,
          left: 16,
          fontSize
        }}
      >
        <KeyboardBackspaceRoundedIcon fontSize="inherit" />
      </IconButton>

      <IconButton 
        aria-label="back"
        style={{
          position: 'absolute',
          color: 'white',
          top: 16,
          right: 16,
          fontSize
        }}
      >
        <EmojiFlagsRoundedIcon fontSize="inherit" />
      </IconButton>

      <div
        id='play-pause-icon'
        style={{
          opacity: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: fontSize*1.5,
          color: 'rgba(255, 255, 255, 0.6)',
          transition: 'opacity 0.3s linear'
        }}
      >
        { paused ? 
          <PauseCircleFilledRoundedIcon fontSize="inherit" />
          :
          <PlayCircleRoundedIcon fontSize="inherit" /> 
        }
      </div>

      <div
        style={{
          bottom: 0,
          paddingLeft: 32,
          paddingRight: 32,
          position: 'absolute',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Slider 
            aria-label="video" 
            defaultValue={0} 
            max={duration}
            min={0}
            onChangeCommitted={onSeek}
            step={1}
            value={position}
            valueLabelDisplay="auto"
            valueLabelFormat={getFormattedDuration}
            sx={{
              zIndex: 5,
              color: theme.palette.primary.main,
              height: 4,
              '& .MuiSlider-thumb': {
                color: theme.palette.primary.main,
                width: 16,
                height: 16,
                transition: '0.3s ease',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)',
                },
                '&.Mui-active': {
                  width: 24,
                  height: 24,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
                color: '#fff',
              },
            }}
          />
          <Typography variant="body1" style={{marginLeft: 16}}>
            {getFormattedDuration(Math.abs(position-duration))}
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <IconButton 
              aria-label="Play"
              onClick={handlePlayPause}
              style={{
                color: 'white',
                fontSize,
                padding: 0
              }}
            >
              {paused ? 
              <PlayArrowRoundedIcon fontSize="inherit" />
              : 
              <PauseRoundedIcon fontSize="inherit" />
              }
            </IconButton>
            <IconButton 
              aria-label="Rewind"
              onClick={(e) => handleRewind(e, 10)}
              style={{
                color: 'white',
                fontSize
              }}
            >
              <Replay10RoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Forward"
              onClick={(e) => handleForward(e, 10)}
              style={{
                color: 'white',
                fontSize
              }}
            >
              <Forward10RoundedIcon fontSize="inherit" />
            </IconButton>
            <Volume
              handleVolume={handleVolume}
            />
          </div>
          <div
            style={{
              maxWidth: '33%'
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              noWrap={true}
            >
              {data.name}
            </Typography>
          </div>
          <div>
            <IconButton 
              aria-label="Skip"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SkipNextRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Episodes"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <AutoAwesomeMotionRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Subtitles"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SubtitlesRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="Speed"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <SpeedRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              style={{
                color: 'white',
                fontSize
              }}
            >
              <FullscreenRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hud