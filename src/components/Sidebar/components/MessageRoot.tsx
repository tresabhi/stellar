import { styled, theme } from 'stitches.config';

export const MessageRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: theme.space.paddingMajor,
  gap: theme.space.gapRelatedRegular,
});
