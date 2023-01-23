import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.space.paddingRegular} ${theme.space.paddingMajor}`,
});
