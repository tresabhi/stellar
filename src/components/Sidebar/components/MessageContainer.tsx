import { styled, theme } from 'stitches.config';

export const MessageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: theme.space.paddingMajor,
  gap: theme.space.gapRelatedRegular,
});
