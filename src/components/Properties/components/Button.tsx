import ButtonPrimitive from 'components/Button';
import { styled, theme } from 'stitches.config';

export const Button = styled(ButtonPrimitive, {
  fontSize: theme.fontSizes[10],
  flex: 1,
  padding: theme.space.paddingRegular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.radii.regular,
  gap: theme.space.gapRelatedRegular,

  '& > svg': {
    width: '1em',
    height: '1em',
  },

  defaultVariants: {
    color: 'default',
    priority: 'default',
    border: true,
  },
});
