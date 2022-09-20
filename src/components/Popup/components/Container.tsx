import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelated,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentNonInteractive,
  backgroundColor: theme.colors.appBackground2,
  padding: theme.space.padding,

  variants: {
    width: {
      regular: {
        width: theme.sizes.popupWidth,
      },
    },
  },
});
