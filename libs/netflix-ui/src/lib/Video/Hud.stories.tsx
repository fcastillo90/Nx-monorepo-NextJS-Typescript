import { Story, Meta } from '@storybook/react';
import Hud, { HudProps } from './Hud';
import { movieIdVideos } from '@fcastillo90/mock';


export default {
  component: Hud,
  title: 'Hud',
  argTypes: {
    handlePause: { action: 'handlePause executed!' },
    handlePlay: { action: 'handlePlay executed!' },
    handleSeek: { action: 'handleSeek executed!' },
    handleVolume: { action: 'handleVolume executed!' },
    handleGetCurrentTime: { action: 'handleGetCurrentTime executed!' },
    handleGoBack: { action: 'handleGoBack executed!' },
    handleFullscreen: { action: 'handleFullscreen executed!' },
  },
} as Meta;

const Template: Story<HudProps> = (args) => <Hud {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  duration: 100,
  data: movieIdVideos.results[0],
};
