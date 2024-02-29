import { StoryObj } from '@storybook/react';
import Modal from './Modal';

/**@type{import('@storybook/react').Meta} */
export default {
  component: Modal,
};

/**@type{import('@storybook/react').StoryObj} */
export const Basic: StoryObj<typeof Modal> = {
  args: {
    cancelText: '',
    confirmText: '',
    children: '',
  },
};
