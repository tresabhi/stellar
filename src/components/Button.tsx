import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  cursor: 'pointer',

  variants: {
    color: {
      default: {
        color: theme.colors.textHighContrast,

        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed,
        },
      },

      accent: {
        color: theme.colors.textHighContrast_accent,

        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed_accent,
        },
      },

      danger: {
        color: theme.colors.textHighContrast_danger,

        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed_danger,
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
        backgroundColor: theme.colors.component,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed,
        },
      },
    },
    {
      color: 'accent',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.component_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'default',

      css: {
        backgroundColor: theme.colors.component_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToAction,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionHovered,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionPressed,
        },
      },
    },
    {
      color: 'accent',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToAction_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionHovered_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionPressed_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'callToAction',

      css: {
        backgroundColor: theme.colors.componentCallToAction_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentCallToActionHovered_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentCallToActionPressed_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolid,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidHovered,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidPressed,
        },
      },
    },
    {
      color: 'accent',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolid_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidHovered_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidPressed_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'solid',

      css: {
        backgroundColor: theme.colors.componentSolid_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentSolidHovered_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentSolidPressed_danger,
        },
      },
    },

    {
      color: 'default',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.component,

        '&:hover': {
          backgroundColor: theme.colors.component,
        },
        '&:active': {
          backgroundColor: theme.colors.component,
        },
      },
    },
    {
      color: 'accent',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.component_accent,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed_accent,
        },
      },
    },
    {
      color: 'danger',
      priority: 'disabled',

      css: {
        backgroundColor: theme.colors.component_danger,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered_danger,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed_danger,
        },
      },
    },

    {
      color: 'default',
      border: true,

      css: {
        border: theme.borderStyles.borderInteractive,

        '&:hover': {
          border: theme.borderStyles.borderInteractiveHovered,
        },
        '&:active': {
          // BIG TODO: remove redundant "border" from border styles and rename pressed to active
          border: theme.borderStyles.borderInteractivePressed,
        },
      },
    },
    {
      color: 'accent',
      border: true,

      css: {
        border: theme.borderStyles.borderInteractive_accent,

        '&:hover': {
          border: theme.borderStyles.borderInteractiveHovered_accent,
        },
        '&:active': {
          border: theme.borderStyles.borderInteractivePressed_accent,
        },
      },
    },
    {
      color: 'danger',
      border: true,

      css: {
        border: theme.borderStyles.borderInteractive_danger,

        '&:hover': {
          border: theme.borderStyles.borderInteractiveHovered_danger,
        },
        '&:active': {
          border: theme.borderStyles.borderInteractivePressed_danger,
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
