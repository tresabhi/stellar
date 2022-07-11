import {
  DropdownMenuContent,
  DropdownMenuContentProps,
} from '@radix-ui/react-dropdown-menu';
import { FC } from 'react';
import { css, theme } from 'stitches.config';

const contentStyles = css({
  backgroundColor: theme.colors.componentBackground,
  border: `${theme.sizes[1]} solid ${theme.colors.interactiveComponentBorder}`,
  borderRadius: theme.radii[4],
  width: theme.sizes.dropdownWidth,
  padding: theme.sizes[8],
  gap: theme.sizes[8],
  display: 'flex',
  flexDirection: 'column',
});

export const Content: FC<DropdownMenuContentProps> = (
  { children, className },
  ...props
) => (
  <DropdownMenuContent
    {...props}
    className={`${contentStyles()} ${className ?? ''}`}
  >
    {children}
  </DropdownMenuContent>
);
