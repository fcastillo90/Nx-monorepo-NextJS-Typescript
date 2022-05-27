import { Story, Meta } from '@storybook/react';
import SearchInput from './SearchInput';

export default {
  component: SearchInput,
  title: 'SearchInput',
} as Meta;

const Template: Story = (args) => <SearchInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
