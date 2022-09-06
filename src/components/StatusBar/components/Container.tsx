import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.space.padding} ${theme.space.paddingMajor}`,
});
