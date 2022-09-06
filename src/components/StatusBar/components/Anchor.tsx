import { Anchor as AnchorComponent } from 'components/Anchor';
import { styled, theme } from 'stitches.config';

export const Anchor = styled(AnchorComponent, {
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
