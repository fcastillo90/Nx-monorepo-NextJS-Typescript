import { Story, Meta } from '@storybook/react';
import { NetflixUi, NetflixUiProps } from './netflix-ui';

export default {
  component: NetflixUi,
  title: 'NetflixUi',
} as Meta;

const Template: Story<NetflixUiProps> = (args) => <NetflixUi {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
