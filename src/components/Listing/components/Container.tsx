import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[4],
  overflowY: 'auto',

  variants: {
    contrast: {
      true: {
        backgroundColor: theme.colors.appBackground2,
      },
    },
  },

  defaultVariants: {
    contrast: true,
  },
});
