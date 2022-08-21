import { styled } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  variants: {
    fullHeight: {
      true: {
        flex: '1 1 0',
      },
    },

    visible: {
      false: {
        display: 'none',
      },
    },
  },

  defaultVariants: {
    visible: true,
  },
});
