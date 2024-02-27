import { StoryObj } from '@storybook/react';
import Header from './Header';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Header,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof Header> = {
  args: {
    isShowLogo: false,
    isShowPrev: false,
    isShowSymbol: false,
    isShowSearch: false,
    isShowSubmit: false,
    customStyle: '',
    children: '',
  },
};
