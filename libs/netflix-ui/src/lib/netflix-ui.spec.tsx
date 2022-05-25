import { render } from '@testing-library/react';

import NetflixUi from './netflix-ui';

describe('NetflixUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NetflixUi />);
    expect(baseElement).toBeTruthy();
  });
});
