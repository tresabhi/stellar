import { styled, theme } from 'stitches.config';

export const TabContainer = styled('div', {
  display: 'flex',
  height: theme.sizes.inputSizeMajor,
  backgroundColor: theme.colors.componentBackground,
  borderBottom: theme.borderStyles.componentNonInteractive,
});
