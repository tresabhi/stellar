import Button from 'components/Button';
import { styled, theme } from 'stitches.config';

export const TitleButton = styled(Button, {
  borderRadius: theme.radii.regular,
  padding: theme.space.paddingMinor,
  display: 'flex',

  '& > svg': {
    width: theme.sizes[8],
    height: theme.sizes[8],
  },

  defaultVariants: {
    border: true,
  },
});
