import './index.scss';
import { FC, InputHTMLAttributes } from 'react';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={`
      ${className}
      title-bar
    `}
    {...props}
  >
    {children}
  </div>
);
