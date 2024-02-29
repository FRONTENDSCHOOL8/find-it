import { StoryObj } from '@storybook/react';
import SearchDate from './SearchDate';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SearchDate,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof SearchDate> = {
  args: {
    children: '',
  },
};
