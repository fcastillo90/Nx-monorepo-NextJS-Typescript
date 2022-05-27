import { Story, Meta } from '@storybook/react';
import YoutubeEmbed, { YoutubeEmbedProps } from './YoutubeEmbed';
import { movieIdVideos } from '@fcastillo90/mock';

export default {
  component: YoutubeEmbed,
  title: 'YoutubeEmbed',
} as Meta;

const Template: Story<YoutubeEmbedProps> = (args) => <YoutubeEmbed {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: movieIdVideos.results[0].id,
  width: 100,
  height: 100,
};
