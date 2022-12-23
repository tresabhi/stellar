import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  cursor: 'pointer',

  variants: {
    color: {
      default: {
        color: theme.colors.textHighContrast,

        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },

      accent: {
        color: theme.colors.textHighContrast_accent,

        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive_accent,
        },
      },
    },

    priority: {
      default: {},

      callToAction: {},

      solid: {},

      disabled: { cursor: 'default' },
    },

    transparent: {
      true: {
        '&:not(:hover), &:not(:active)': {
          backgroundColor: 'transparent',
        },
      },
    },

    border: {
      true: {},
      false: {
        border: 'none',
      },
    },
  },

  compoundVariants: [
    {
      color: 'default',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.componentBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.componentBackground_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_accent,
        },
      },
    },

    {
      color: 'default',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionBackgroundActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionBackground_accent,

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
      color: 'default',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidBackgroundActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidBackground_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidBackgroundActive_accent,
        },
      },
    },

    {
      color: 'default',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.componentBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentBackground,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackground,
        },
      },
    },
    {
      color: 'accent',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.componentBackground_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_accent,
        },
      },
    },

    {
      color: 'default',
      border: true,

      css: {
        border: theme.borderStyles.componentInteractive,

        '&:hover': {
          border: theme.borderStyles.componentInteractiveHover,
        },
        '&:active': {
          border: theme.borderStyles.componentInteractiveActive,
        },
      },
    },
    {
      color: 'accent',
      border: true,

      css: {
        border: theme.borderStyles.componentInteractive_accent,

        '&:hover': {
          border: theme.borderStyles.componentInteractiveHover_accent,
        },
        '&:active': {
          border: theme.borderStyles.componentInteractiveActive_accent,
        },
      },
    },
  ],

  defaultVariants: {
    color: 'default',
    priority: 'default',
  },
});
export default Button;
