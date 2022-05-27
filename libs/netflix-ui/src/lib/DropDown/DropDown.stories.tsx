import { Story, Meta } from '@storybook/react';
import CustomDropDown, { CustomDropDownProps } from './DropDown';

export default {
  component: CustomDropDown,
  title: 'CustomDropDown',
  argTypes: {
    children: { action: 'children executed!' },
  },
} as Meta;

const Template: Story<CustomDropDownProps> = (args) => (
  <CustomDropDown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  showArrow: false,
  popperId: '',
};
