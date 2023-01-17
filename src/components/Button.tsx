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

      danger: {
        color: theme.colors.textHighContrast_danger,

        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive_danger,
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
      color: 'danger',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.componentBackground_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_danger,
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
      color: 'danger',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionBackground_danger,

        '&:hover': {
          backgroundColor:
            theme.colors.componentCallToActionBackgroundHover_danger,
        },
        '&:active': {
          backgroundColor:
            theme.colors.componentCallToActionBackgroundActive_danger,
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
      color: 'danger',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidBackground_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidBackgroundHover_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidBackgroundActive_danger,
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
      color: 'danger',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.componentBackground_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_danger,
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
    {
      color: 'danger',
      border: true,

      css: {
        border: theme.borderStyles.componentInteractive_danger,

        '&:hover': {
          border: theme.borderStyles.componentInteractiveHover_danger,
        },
        '&:active': {
          border: theme.borderStyles.componentInteractiveActive_danger,
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
