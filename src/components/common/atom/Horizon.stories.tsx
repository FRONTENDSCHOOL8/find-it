import { StoryObj } from '@storybook/react';
import Horizon from './Horizon';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Horizon,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof Horizon> = {
  args: {
    lineBold: 'thin',
    lineWidth: 'short',
  },
};
