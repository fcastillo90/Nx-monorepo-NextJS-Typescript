import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface NetflixUiProps {}

const StyledNetflixUi = styled.div`
  color: pink;
`;

export function NetflixUi(props: NetflixUiProps) {
  return (
    <StyledNetflixUi>
      <h1>Welcome to NetflixUi!</h1>
    </StyledNetflixUi>
  );
}

export default NetflixUi;
