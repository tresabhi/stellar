import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  backgroundColor: theme.colors.componentInteractive,
  height: theme.sizes[40],
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: theme.borderStyles.nonInteractive,
});
