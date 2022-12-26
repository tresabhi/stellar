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
        backgroundColor: theme.colors.componentBackground,
      },

      accent: {
        backgroundColor: theme.colors.componentBackground_accent,
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
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },
    },
    {
      color: 'accent',
      disabled: false,

      css: {
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_accent,
        },
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive_accent,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    disabled: false,
  },
});
