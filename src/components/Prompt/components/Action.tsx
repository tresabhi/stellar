import ButtonPrimitive from 'components/Button';
import { styled, theme } from 'stitches.config';

export const Action = styled(ButtonPrimitive, {
  flex: 1,
  padding: theme.space.paddingMinor,
  borderRadius: theme.radii[4],
  fontSize: theme.fontSizes[12],
  whiteSpace: 'nowrap',

  defaultVariants: {
    border: true,
  },
});
