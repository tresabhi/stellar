import Button from 'components/Button';
import { styled, theme } from 'stitches.config';

export const Action = styled(Button, {
  padding: theme.space.paddingMinor,
  fontSize: theme.fontSizes[12],
  borderRadius: theme.radii.regular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  whiteSpace: 'nowrap',

  defaultVariants: {
    border: 'true',
  },
});
