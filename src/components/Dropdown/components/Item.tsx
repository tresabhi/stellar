import {
  DropdownMenuItem,
  DropdownMenuItemProps,
} from '@radix-ui/react-dropdown-menu';
import { FC, ReactNode } from 'react';
import { css, theme } from 'stitches.config';

export interface ItemProps extends DropdownMenuItemProps {
  icon?: ReactNode;
  children: string;
  keybind?: string;
}

const itemStyles = css({
  display: 'flex',
  gap: theme.sizes[8],
  padding: theme.sizes[4],
  borderRadius: theme.radii[4],
  alignItems: 'center',

  '&:hover': { backgroundColor: theme.colors.componentHoverBackground },
  '&:active': { backgroundColor: theme.colors.componentActiveBackground },
});

const iconContainerStyles = css({
  width: theme.sizes[16],
  height: theme.sizes[16],

  '& svg': {
    height: theme.sizes[16],
    width: theme.sizes[16],
    color: theme.colors.highContrastText,
  },
});

const labelStyles = css({
  color: theme.colors.highContrastText,
  fontSize: theme.fontSizes[12],
  fontFamily: theme.fonts.base,
  flex: '1',
});

const keybindStyles = css({
  color: theme.colors.lowContrastText,
  fontSize: theme.fontSizes[10],
  fontFamily: theme.fonts.mono,
});

export const Item: FC<ItemProps> = ({
  children,
  className,
  icon,
  keybind,
  ...props
}) => (
  <DropdownMenuItem {...props} className={`${itemStyles()} ${className ?? ''}`}>
    <div className={iconContainerStyles()}>{icon}</div>
    <span className={labelStyles()}>{children}</span>
    <span className={keybindStyles()}>{keybind}</span>
  </DropdownMenuItem>
);
