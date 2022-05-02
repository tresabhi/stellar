import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps {
  label: string;
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children, label: title }) => {
  return (
    <button className={styles.button}>
      {title}
      {children ? (
        <div className={styles.extension}>{children}</div>
      ) : undefined}
    </button>
  );
};
