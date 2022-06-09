import { genreMovieList, moviePopular } from '@fcastillo90/mock';
import { Story, Meta } from '@storybook/react';
import { Slider, SliderProps } from './Slider';

export default {
  component: Slider,
  title: 'Slider',
  argTypes: {
    handleDetailModal: { action: 'handleDetailModal executed!' },
  },
} as Meta;

const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isLarge: false,
  isTopTen: false,
  slug: 'test',
  data: moviePopular.results,
  handleDetailModal: () => {},
  genreList: genreMovieList
};
