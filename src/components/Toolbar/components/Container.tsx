import { styled } from '@stitches/react';
import { theme } from 'stitches.config';

export const Container = styled('div', {
  backgroundColor: theme.colors.componentBackground,
  height: theme.sizes[40],
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: theme.borderStyles.componentNonInteractive,
});
