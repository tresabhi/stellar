import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => (
  <div {...props} className={`${styles.container} ${className ?? ''}`}>
    {children}
  </div>
);
