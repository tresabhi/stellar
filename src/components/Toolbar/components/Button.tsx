import { FC, InputHTMLAttributes, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  selected,
  ...props
}) => (
  //@ts-ignore
  <button
    {...props}
    className={`${styles.button} ${selected ? styles.selected : ''} ${
      className ?? ''
    }`}
  >
    {children}
  </button>
);
