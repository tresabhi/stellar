import { FC, InputHTMLAttributes } from 'react';
import { css } from 'stitches.config';

export interface GroupProps extends InputHTMLAttributes<HTMLDivElement> {}

const groupStyles = css({ display: 'flex' });

export const Group: FC<GroupProps> = ({ children, className, ...props }) => (
  <div {...props} className={`${groupStyles()} ${className ?? ''}`}>
    {children}
  </div>
);
