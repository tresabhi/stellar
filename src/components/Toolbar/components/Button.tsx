import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  //@ts-ignore
  <button {...props} className={`${styles.button} ${className ?? ''}`}>
    {children}
  </button>
);
