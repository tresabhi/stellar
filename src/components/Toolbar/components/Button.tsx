// import { Button as ButtonComponent } from 'components/Button';
import { styled, theme } from 'stitches.config';

// TODO: switch to ButtonComponent when disabled variant is not needed
export const Button = styled('button', {
  display: 'flex',
  width: theme.sizes[40],
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    disabled: {
      true: {
        color: theme.colors.textLowContrast,
      },

      false: {
        cursor: 'pointer',
        color: theme.colors.textHighContrast,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});
