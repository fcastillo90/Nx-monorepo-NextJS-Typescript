import { Story, Meta } from '@storybook/react';
import { ButtonSliderNext, ButtonSliderNextProps } from './ButtonSliderNext';

export default {
  component: ButtonSliderNext,
  title: 'ButtonSliderNext',
  argTypes: {
    handleNext: { action: 'handleNext executed!' },
  },
} as Meta;

const Template: Story<ButtonSliderNextProps> = (args) => (
  <ButtonSliderNext {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isNextVisible: true,
  isLarge: false,
  isTopTen: false,
  handleNext: () => {},
};
