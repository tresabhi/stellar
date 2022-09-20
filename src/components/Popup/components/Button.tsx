import { Button as ButtonPrimitive } from 'components/Button';
import { styled, theme } from 'stitches.config';

export const Button = styled(ButtonPrimitive, {
  height: theme.sizes.inputSizeMajor,
  flex: 1,
  borderRadius: theme.radii[4],
  fontSize: theme.fontSizes[12],

  defaultVariants: {
    border: true,
  },
});
