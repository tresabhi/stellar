import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  gap: theme.space.gapRelatedMajor,
  padding: theme.space.paddingRegular,
  paddingBottom: 0,
  backgroundColors: theme.colors.appBackground1,
});
