import { ToolbarButton, ToolbarButtonProps } from '@radix-ui/react-toolbar';
import { css } from '@stitches/react';
import { FC } from 'react';
import { theme } from 'stitches.config';

export const buttonStyles = css({
  display: 'flex',
  width: theme.sizes[40],
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentBackgroundActive,
  },
  '&:focus-visible': {
    outline: theme.borderStyles.interactiveComponentActiveBorder,
  },

  '& svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
    color: theme.colors.highContrastText,
  },

  variants: {
    disabled: {
      true: {
        cursor: 'default',

        '&:hover': { backgroundColor: 'transparent' },
        '&:active': { backgroundColor: 'transparent' },

        '& svg': {
          color: theme.colors.lowContrastText,
        },
      },
    },
  },
});

export const Button: FC<ToolbarButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => (
  <ToolbarButton
    {...props}
    disabled={disabled}
    className={`${buttonStyles({ disabled })} ${className ?? ''}`}
  >
    {children}
  </ToolbarButton>
);
