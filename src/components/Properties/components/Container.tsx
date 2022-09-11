import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapUnrelatedMajor,
  flex: 1,
});
