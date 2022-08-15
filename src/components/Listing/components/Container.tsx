import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[4],
  overflowY: 'visible',

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
