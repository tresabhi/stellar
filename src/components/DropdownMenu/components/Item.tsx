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
        backgroundColor: theme.colors.componentInteractive,
      },

      accent: {
        backgroundColor: theme.colors.componentInteractive_accent,
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
          backgroundColor: theme.colors.componentInteractiveHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive,
        },
        '&:focus': {
          outline: theme.borderStyles.interactiveActive,
        },
      },
    },
    {
      color: 'accent',
      disabled: false,

      css: {
        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive_accent,
        },
        '&:focus': {
          outline: theme.borderStyles.interactiveActive_accent,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    disabled: false,
  },
});
