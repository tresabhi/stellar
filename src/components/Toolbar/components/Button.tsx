import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, selected, disabled, ...props }, ref) => (
    //@ts-ignore
    <button
      {...props}
      className={`${styles.button} ${selected ? styles.selected : ''} ${
        disabled ? styles.disabled : ''
      } ${className ?? ''}`}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  ),
);
