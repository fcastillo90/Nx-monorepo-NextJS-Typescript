import { moviePopular, genreMovieList } from '@fcastillo90/mock';
import { Story, Meta } from '@storybook/react';
import { Preview, PreviewProps } from './Preview';

export default {
  component: Preview,
  title: 'Preview',
  argTypes: {
    handleWatch: { action: 'handleWatch executed!' },
    handleMoreInfo: { action: 'handleMoreInfo executed!' },
  },
} as Meta;

const Template: Story<PreviewProps> = (args) => <div style={{backgroundColor: 'black'}}><Preview {...args} /></div>;

export const Primary = Template.bind({});
Primary.args = {
  isActive: true,
  handleWatch: () => {},
  handleMoreInfo: () => {},
  data: moviePopular.results[0],
  genreList: genreMovieList
};
