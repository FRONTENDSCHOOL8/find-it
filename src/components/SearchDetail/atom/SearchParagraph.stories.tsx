import { StoryObj } from '@storybook/react';
import SearchParagraph from './SearchParagraph';

/**@type{import('@storybook/react').Meta} */
export default {
  component: SearchParagraph,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof SearchParagraph> = {
  args: {
    children: '',
  },
};
