import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div {...props} className={`${styles['tabs-container']} ${className}`}>
    {children}
  </div>
);
