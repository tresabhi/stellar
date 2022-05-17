import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  selected,
  disabled,
  ...props
}) => (
  //@ts-ignore
  <button
    {...props}
    className={`${styles.button} ${selected ? styles.selected : ''} ${
      disabled ? styles.disabled : ''
    } ${className ?? ''}`}
  >
    {children}
  </button>
);
