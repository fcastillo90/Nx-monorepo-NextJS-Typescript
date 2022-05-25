import styled from '@emotion/styled';
import { Button as MuiButton } from '@mui/material';

/* eslint-disable-next-line */
export interface ButtonProps {}

const StyledButton = styled.div`
  color: pink;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton>
      <MuiButton>test</MuiButton>
    </StyledButton>
  );
}

export default Button;
