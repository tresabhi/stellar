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
      },
    },

    disabled: {
      true: {
        color: theme.colors.textLowContrast,
        cursor: 'default',

        '&:hover': {
          backgroundColor: theme.colors.componentBackground,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackground,
        },
      },

      false: {
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },
    },

    callToAction: {
      true: {
        backgroundColor: theme.colors.componentCallToActionBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionBackgroundActive,
        },
      },
    },

    padding: {
      true: {
        padding: theme.space.padding,
      },
    },

    borderRadius: {
      true: {
        borderRadius: theme.radii[4],
      },
    },

    border: {
      true: {
        border: theme.borderStyles.componentInteractive,
      },
    },

    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },

  compoundVariants: [
    {
      color: 'accent',
      disabled: true,

      css: {
        color: theme.colors.textLowContrast_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentBackground_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackground_accent,
        },
      },
    },
    {
      color: 'accent',
      callToAction: true,

      css: {
        backgroundColor: 'none',

        '&:hover': {
          backgroundColor:
            theme.colors.componentCallToActionBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor:
            theme.colors.componentCallToActionBackgroundActive_accent,
        },
      },
    },
    {
      color: 'accent',
      callToAction: true,
      transparent: false,

      css: {
        backgroundColor: theme.colors.componentCallToActionBackground_accent,
      },
    },
    {
      color: 'accent',
      border: true,

      css: {
        border: theme.borderStyles.componentInteractive_accent,
      },
    },
    {
      color: 'accent',
      disabled: false,

      css: {
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive_accent,
        },
      },
    },
  ],

  defaultVariants: {
    border: false,
    borderRadius: false,
    callToAction: false,
    color: 'default',
    disabled: false,
    padding: false,
    transparent: false,
  },
});
