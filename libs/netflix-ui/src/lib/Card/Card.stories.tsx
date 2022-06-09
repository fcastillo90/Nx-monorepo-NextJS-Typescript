import { genreMovieList, moviePopular } from '@fcastillo90/mock';
import { Story, Meta } from '@storybook/react';
import { Card, CardProps } from './Card';

export default {
  component: Card,
  title: 'Card',
  argTypes: {
    handleClick: { action: 'handleClick executed!' },
    handleMoreInfo: { action: 'handleClick executed!' },
    handleWatch: { action: 'handleClick executed!' },
  },
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isLarge: false,
  isTopTen: false,
  index: 0,
  lastInTopTen: false,
  data: moviePopular.results[0],
  genreList: genreMovieList
};
