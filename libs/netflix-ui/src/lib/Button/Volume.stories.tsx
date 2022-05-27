import { Story, Meta } from '@storybook/react';
import Volume, { VolumeProps } from './Volume';

export default {
  component: Volume,
  title: 'Volume',
  argTypes: {
    handleVolume: { action: 'handleVolume executed!' },
  },
} as Meta;

const Template: Story<VolumeProps> = (args) => <Volume {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
