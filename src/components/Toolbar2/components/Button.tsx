import { ToolbarButton, ToolbarButtonProps } from '@radix-ui/react-toolbar';
import { css } from '@stitches/react';
import { FC } from 'react';
import { theme } from 'stitches.config';

export const buttonStyles = css({
  display: 'flex',
  width: theme.sizes[40],
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': { backgroundColor: theme.colors.componentHoverBackground },
  '&:active': { backgroundColor: theme.colors.componentActiveBackground },

  '& svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
    color: theme.colors.highContrastText,
  },
});

export const Button: FC<ToolbarButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <ToolbarButton {...props} className={`${buttonStyles()} ${className ?? ''}`}>
    {children}
  </ToolbarButton>
);
