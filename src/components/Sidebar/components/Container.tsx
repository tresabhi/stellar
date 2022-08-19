import { styled, theme } from 'stitches.config';

export const Container = styled('div', {
  backgroundColor: theme.colors.componentBackground,
  display: 'flex',
  flexDirection: 'column',
  width: theme.sizes.sidebarWidth,

  variants: {
    position: {
      left: {
        borderRight: theme.borderStyles.componentNonInteractive,
      },

      right: {
        borderLeft: theme.borderStyles.componentNonInteractive,
      },
    },

    visible: {
      false: {
        display: 'none',
      },
    },
  },

  defaultVariants: {
    visible: true,
  },
});
