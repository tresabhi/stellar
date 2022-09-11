import { Anchor as AnchorPrimitive } from 'components/Anchor';
import { styled, theme } from 'stitches.config';

export const Anchor = styled(AnchorPrimitive, {
  fontSize: theme.fontSizes[10],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  defaultVariants: {
    accent: false,
  },
});
