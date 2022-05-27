import { Story, Meta } from '@storybook/react';
import GradientBottom from './GradientBottom';

export default {
  component: GradientBottom,
  title: 'GradientBottom',
} as Meta;

const Template: Story = (args) => <GradientBottom {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
