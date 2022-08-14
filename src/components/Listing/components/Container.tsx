import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.radii[4],
  overflowY: 'visible',
  maxHeight: theme.sizes.palletMaxHeight,
});
