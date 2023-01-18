import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  gap: theme.space.gapRelatedMajor,
  padding: `${theme.space.padding} ${theme.space.padding} 0 ${theme.space.padding}`,
  backgroundColors: theme.colors.appBackground1,
});
