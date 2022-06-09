import { Button, styled } from "@mui/material"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { SLIDE_HEIGHT } from "@fcastillo90/constants";

export interface ButtonSliderPrevProps {
  handlePrev: () => void;
  isPrevVisible: boolean;
  isLarge: boolean;
  isTopTen: boolean;
}
interface StyledButtonProps {
  isLarge: boolean;
  isTopTen: boolean;
  isPrevVisible: boolean;
}
const StyledButton = styled(Button)<StyledButtonProps>`
  position: absolute;
  height: ${({isLarge, isTopTen}) => isLarge ?
    SLIDE_HEIGHT * 3
    :
    isTopTen ? SLIDE_HEIGHT * 1.5 : SLIDE_HEIGHT}px;
  color: white;
  border-radius: 0;
  z-index: 5;
  display: ${({isPrevVisible}) => isPrevVisible ? 'block' : 'none'};
  left: 0;
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
`;

export const ButtonSliderPrev = (props: ButtonSliderPrevProps) => {
  const { handlePrev, isPrevVisible, isLarge, isTopTen } = props;
  return (
    <StyledButton
      key="prev"
      variant="text"
      onClick={handlePrev}
      isLarge={isLarge}
      isTopTen={isTopTen}
      isPrevVisible={isPrevVisible}
    >
      <ArrowBackIosNewRoundedIcon />
    </StyledButton>
  )
}

export default ButtonSliderPrev