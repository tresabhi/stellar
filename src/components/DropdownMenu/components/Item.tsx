import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { styled, theme } from 'stitches.config';

export const Item = styled(DropdownMenuPrimitive.Item, {
  cursor: 'pointer',
  display: 'flex',
  gap: theme.sizes[8],
  padding: theme.sizes[8],
  borderRadius: theme.radii[4],
  alignItems: 'center',

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentBackgroundActive,
  },
  '&:focus': {
    outline: theme.borderStyles.componentInteractiveActive,
  },
});
