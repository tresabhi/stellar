import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[4],
  overflowY: 'auto',
  height: '100px',

  variants: {
    darkBackground: {
      true: {
        backgroundColor: theme.colors.appBackground2,
      },
    },
  },

  defaultVariants: {
    darkBackground: true,
  },
});
