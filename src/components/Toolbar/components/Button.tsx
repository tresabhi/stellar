import { css } from '@stitches/react';
import { FC, InputHTMLAttributes } from 'react';
import { theme } from 'stitches.config';

export const buttonStyles = css({
  display: 'flex',
  width: theme.sizes[40],
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveBorderHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentInteractiveBorderActive,
  },
  '&:focus-visible': {
    outline: theme.borderStyles.componentInteractiveActive,
  },

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
    color: theme.colors.textHighContrast,
  },

  variants: {
    disabled: {
      true: {
        cursor: 'default',

        '&:hover': { backgroundColor: 'transparent' },
        '&:active': { backgroundColor: 'transparent' },

        '& > svg': {
          color: theme.colors.textLowContrast,
        },
      },
    },
  },
});

export interface ButtonProps extends InputHTMLAttributes<ButtonProps> {}

export const Button: FC<ButtonProps> = ({ children, className, disabled, ...props }) => (
  // @ts-ignore
  <button {...props} disabled={disabled} className={`${buttonStyles({ disabled })} ${className ?? ''}`}>
    {children}
  </button>
);
