import { Story, Meta } from '@storybook/react';
import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

export default {
  component: ButtonGroup,
  title: 'ButtonGroup',
  argTypes: {
    handleMoreInfo: { action: 'handleMoreInfo executed!' },
    handleWatch: { action: 'handleWatch executed!' },
  },
} as Meta;

const Template: Story<ButtonGroupProps> = (args) => <ButtonGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isLarge: false,
};
