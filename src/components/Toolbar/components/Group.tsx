import { Toolbar, ToolbarProps } from '@radix-ui/react-toolbar';
import { FC } from 'react';
import { css } from 'stitches.config';

const groupStyles = css({ display: 'flex' });

export const Group: FC<ToolbarProps> = ({ children, className, ...props }) => (
  <Toolbar {...props} className={`${groupStyles()} ${className ?? ''}`}>
    {children}
  </Toolbar>
);
