import { movieIdVideos, moviePopular } from '@fcastillo90/mock';
import { CategoryType } from '@fcastillo90/types';
import { Story, Meta } from '@storybook/react';
import { Billboard, BillboardProps } from './Billboard';

export default {
  component: Billboard,
  title: 'Billboard',
  argTypes: {
    handleMoreInfo: { action: 'handleMoreInfo executed!' },
  },
} as Meta;

const Template: Story<BillboardProps> = (args) => <Billboard {...args} />;

const data = moviePopular.results[0]

export const Primary = Template.bind({});
Primary.args = {
  category: CategoryType.MOVIE,
  handleMoreInfo: (id: number, category: CategoryType) => {},
  id: data.id,
  image: data.backdrop_path ?? data.poster_path,
  isModalOpen: false,
  overview: data.overview,
  title: data.title,
  videoData: movieIdVideos.results
};
