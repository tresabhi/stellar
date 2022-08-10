import { styled, theme } from 'stitches.config';

const Button = styled('button', {
  variants: {
    color: {
      default: {
        backgroundColor: theme.colors.componentBackground,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },
      accent: {
        backgroundColor: theme.colors.componentBackground_accent,
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover_accent,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive_accent,
        },
        '&:focus-visible': {
          outline: theme.borderStyles.componentInteractiveActive_accent,
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
