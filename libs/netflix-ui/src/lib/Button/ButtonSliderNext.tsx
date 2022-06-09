import { Button, styled } from "@mui/material"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { SLIDE_HEIGHT } from "@fcastillo90/constants";

export interface ButtonSliderNextProps {
  handleNext: () => void;
  isNextVisible: boolean;
  isLarge: boolean;
  isTopTen: boolean;
}
interface StyledButtonProps {
  isLarge: boolean;
  isTopTen: boolean;
  isNextVisible: boolean;
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
  display: ${({isNextVisible}) => isNextVisible ? 'block' : 'none'};
  right: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
`;

export const ButtonSliderNext = (props: ButtonSliderNextProps) => {
  const { handleNext, isNextVisible, isLarge, isTopTen } = props;
  return (
    <StyledButton
      key="next"
      variant="text"
      onClick={handleNext}
      isLarge={isLarge}
      isTopTen={isTopTen}
      isNextVisible={isNextVisible}
    >
      <ArrowForwardIosRoundedIcon />
    </StyledButton>
  )
}

export default ButtonSliderNext