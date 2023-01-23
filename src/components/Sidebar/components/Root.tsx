import { styled, theme } from 'stitches.config';

export const Root = styled('div', {
  backgroundColor: theme.colors.appBackground2,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',

  variants: {
    position: {
      left: {},

      right: {},
    },

    visible: {
      true: {
        width: theme.sizes.sidebarWidth,
      },

      false: {
        width: 0,
      },
    },
  },

  compoundVariants: [
    {
      visible: true,
      position: 'left',

      css: {
        borderRight: theme.borderStyles.borderNonInteractive,
      },
    },
    {
      visible: true,
      position: 'right',

      css: {
        borderLeft: theme.borderStyles.borderNonInteractive,
      },
    },
  ],

  defaultVariants: {
    visible: true,
  },
});
