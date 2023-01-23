import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { styled, theme } from 'stitches.config';

export const Item = styled(DropdownMenuPrimitive.Item, {
  display: 'flex',
  gap: theme.sizes[8],
  padding: theme.sizes[8],
  borderRadius: theme.radii[4],
  alignItems: 'center',

  variants: {
    color: {
      default: {
        backgroundColor: theme.colors.component,
      },

      accent: {
        backgroundColor: theme.colors.component_accent,
      },
    },

    disabled: {
      false: {
        cursor: 'pointer',
      },
    },
  },

  compoundVariants: [
    {
      color: 'default',
      disabled: false,

      css: {
        '&:hover': {
          backgroundColor: theme.colors.componentHovered,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed,
        },
        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed,
        },
      },
    },
    {
      color: 'accent',
      disabled: false,

      css: {
        '&:hover': {
          backgroundColor: theme.colors.componentHovered_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed_accent,
        },
        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed_accent,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    disabled: false,
  },
});
