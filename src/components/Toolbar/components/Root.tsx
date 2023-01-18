import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  backgroundColor: theme.colors.componentBackground,
  height: theme.sizes[40],
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: theme.borderStyles.componentNonInteractive,
});