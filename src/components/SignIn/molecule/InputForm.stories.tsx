import { StoryObj } from '@storybook/react';
import InputForm from './InputForm';

/**@type{import('@storybook/react').Meta} */
export default {
  component: InputForm,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof InputForm> = {
  args: {
    type: 'text',
    title: 'Title',
    placeholder: 'placeholder',
    alretText: 'doubleCheckEmail',
    isDoubleCheck: false,
    isDeleteContent: false,
    isEyeToggle: false,
  },
};
