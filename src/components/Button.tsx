import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  cursor: 'pointer',

  variants: {
    color: {
      default: {
        color: theme.colors.textHighContrast,

        '&:focus': {
          outline: theme.borderStyles.interactiveActive,
        },
      },

      accent: {
        color: theme.colors.textHighContrast_accent,

        '&:focus': {
          outline: theme.borderStyles.interactiveActive_accent,
        },
      },

      danger: {
        color: theme.colors.textHighContrast_danger,

        '&:focus': {
          outline: theme.borderStyles.interactiveActive_danger,
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
        backgroundColor: theme.colors.componentInteractive,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.componentInteractive_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.componentInteractive_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionInteractive,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionInteractiveHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionInteractiveActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionInteractive_accent,

        '&:hover': {
          backgroundColor:
            theme.colors.componentCallToActionInteractiveHover_accent,
        },
        '&:active': {
          backgroundColor:
            theme.colors.componentCallToActionInteractiveActive_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToActionInteractive_danger,

        '&:hover': {
          backgroundColor:
            theme.colors.componentCallToActionInteractiveHover_danger,
        },
        '&:active': {
          backgroundColor:
            theme.colors.componentCallToActionInteractiveActive_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidInteractive,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidInteractiveHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidInteractiveActive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidInteractive_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidInteractiveHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidInteractiveActive_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolidInteractive_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidInteractiveHover_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidInteractiveActive_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.componentInteractive,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractive,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractive,
        },
      },
    },
    {
      color: 'accent',
      priority: 'disabled',

      css: { backgroundColor: theme.colors.componentNonInteractive_accent },
    },
    {
      color: 'danger',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.componentNonInteractive_danger,
      },
    },

    {
      color: 'default',
      border: true,

      css: {
        border: theme.borderStyles.interactive,

        '&:hover': {
          border: theme.borderStyles.interactiveHover,
        },
        '&:active': {
          border: theme.borderStyles.interactiveActive,
        },
      },
    },
    {
      color: 'accent',
      border: true,

      css: {
        border: theme.borderStyles.interactive_accent,

        '&:hover': {
          border: theme.borderStyles.interactiveHover_accent,
        },
        '&:active': {
          border: theme.borderStyles.interactiveActive_accent,
        },
      },
    },
    {
      color: 'danger',
      border: true,

      css: {
        border: theme.borderStyles.interactive_danger,

        '&:hover': {
          border: theme.borderStyles.interactiveHover_danger,
        },
        '&:active': {
          border: theme.borderStyles.interactiveActive_danger,
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
