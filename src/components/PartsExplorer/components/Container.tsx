import { styled } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  variants: {
    fullHeight: {
      true: {
        flex: 1,
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
