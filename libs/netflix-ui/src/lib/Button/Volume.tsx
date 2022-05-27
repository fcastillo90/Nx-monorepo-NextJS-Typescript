import { useState } from "react";
import { Box, ClickAwayListener, IconButton, Popper, Slider } from "@mui/material"
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { preventHorizontalKeyboardNavigation } from "@fcastillo90/netflix-ui";

export interface VolumeProps {
  handleVolume: (value: number) => void;
}

const fontSize = 60

const Volume = (props: VolumeProps) => {
  const { handleVolume } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [volume, setVolume] = useState(100);

  const handleOpenVolume = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleGetVolumeIcon = () => {
    if (volume === 0) return <VolumeOffRoundedIcon fontSize="inherit" />
    if (volume < 50) return <VolumeDownRoundedIcon fontSize="inherit" />
    return <VolumeUpRoundedIcon fontSize="inherit" />
  }
  const handleMute = (e: any) => {
    e.stopPropagation()
    if (volume === 0) {
      setVolume(100)
      handleVolume(100)
      return
    }
    setVolume(0)
    handleVolume(0)
  }
  const handleCloseVolume = (e: any) => {
    setAnchorEl(null)
    e.stopPropagation()
  }
  const onVolume = (e: Event, newValue: number | number[]) => {
    handleVolume(newValue as number)
    setVolume(newValue as number)
    e.stopPropagation()
  }

  return (
    <ClickAwayListener onClickAway={handleCloseVolume}>
      <div
        style={{
          display: 'inline-flex',
          verticalAlign: 'middle',
        }}
      >
      <IconButton 
        aria-label="Volume"
        onMouseEnter={handleOpenVolume}
        onClick={handleMute}
        style={{
          color: 'white',
          fontSize
        }}
      >
        {handleGetVolumeIcon()}
      </IconButton>
        <Popper 
          open={Boolean(anchorEl)} 
          anchorEl={anchorEl}
          style={{
            zIndex: 10
          }}
        >
          <Box 
            sx={{ 
              border: 1, 
              p: 1, 
              bgcolor: 'background.paper',
              height: 200,
              paddingTop: 3,
              paddingBottom: 2,
            }}
          >
            <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              orientation="vertical"
              max={100}
              min={0}
              value={volume}
              onChange={onVolume}
              onKeyDown={preventHorizontalKeyboardNavigation}
            />
          </Box>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default Volume