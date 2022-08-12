import { styled, theme } from 'stitches.config';

export const Button = styled('button', {
  cursor: 'pointer',

  variants: {
    color: {
      default: {
        color: theme.colors.textHighContrast,

        backgroundColor: theme.colors.componentBackground,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },

      accent: {
        color: theme.colors.textHighContrast_accent,

        backgroundColor: theme.colors.componentBackground_accent,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_accent,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.componentInteractiveActive_accent,
        },
      },
    },

    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },

    disabled: {
      true: {
        cursor: 'default',
      },
    },
  },

  compoundVariants: [
    {
      color: 'default',
      disabled: true,

      css: {
        color: theme.colors.textLowContrast,
      },
    },
    {
      color: 'accent',
      disabled: true,

      css: {
        color: theme.colors.textLowContrast_accent,
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    disabled: false,
    transparent: false,
  },
});
