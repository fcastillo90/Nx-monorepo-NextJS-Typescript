import { Story, Meta } from '@storybook/react';
import { ButtonSliderPrev, ButtonSliderPrevProps } from './ButtonSliderPrev';

export default {
  component: ButtonSliderPrev,
  title: 'ButtonSliderPrev',
  argTypes: {
    handlePrev: { action: 'handlePrev executed!' },
  },
} as Meta;

const Template: Story<ButtonSliderPrevProps> = (args) => (
  <ButtonSliderPrev {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isPrevVisible: true,
  isLarge: false,
  isTopTen: false,
  handlePrev: () => {},
};
