import { styled, theme } from 'stitches.config';

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.padding,
  gap: theme.space.gapRelatedMajor,
  backgroundColor: theme.colors.appBackground2,

  variants: {
    width: {
      regular: {
        width: theme.sizes.popupWidth,
      },
    },
  },
});
