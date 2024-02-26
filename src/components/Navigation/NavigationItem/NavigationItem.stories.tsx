import { StoryObj } from '@storybook/react';
import NavigationItem from './NavigationItem';

/**@type{import('@storybook/react').Meta} */
export default {
  component: NavigationItem,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof NavigationItem> = {
  args: {
    isHomeTrue: false,
  },
};
