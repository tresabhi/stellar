import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentNonInteractive,
  backgroundColor: theme.colors.componentBackground,
  padding: theme.space.padding,
});
