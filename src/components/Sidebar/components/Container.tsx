import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
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
        borderRight: theme.borderStyles.componentNonInteractive,
      },
    },
    {
      visible: true,
      position: 'right',

      css: {
        borderLeft: theme.borderStyles.componentNonInteractive,
      },
    },
  ],

  defaultVariants: {
    visible: true,
  },
});
