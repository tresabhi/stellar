import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  variants: {
    color: {
      base: {
        backgroundColor: theme.colors.componentBackground,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.interactiveComponentActiveBorder,
        },
      },
      accent: {
        backgroundColor: theme.colors.componentBackgroundAccent,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHoverAccent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActiveAccent,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.interactiveComponentActiveBorderAccent,
        },
      },
    },
    transparent: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },
});
export default Button;
