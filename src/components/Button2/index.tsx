import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  variants: {
    color: {
      base: {
        backgroundColor: theme.colors.componentBackground,
        '&:hover': {
          backgroundColor: theme.colors.componentHoverBackground,
        },
        '&:active': {
          backgroundColor: theme.colors.componentActiveBackground,
        },
        '&:focus': {
          outline: theme.borderStyles.interactiveComponentActiveBorder,
        },
      },
      accent: {
        backgroundColor: theme.colors.componentBackgroundAccent,
        '&:hover': {
          backgroundColor: theme.colors.componentHoverBackgroundAccent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentActiveBackgroundAccent,
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
