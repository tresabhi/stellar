import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapRelatedMajor,
  backgroundColor: theme.colors.appBackground2,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentInteractive,
  width: theme.sizes.toastWidth,
});
