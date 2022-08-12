import { Button as ButtonComponent } from 'components/Button';
import { styled, theme } from 'stitches.config';

export const Button = styled(ButtonComponent, {
  display: 'flex',
  width: theme.sizes[40],
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },
});
