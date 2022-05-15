import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps {
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({ children }) => (
  <button className={styles.button}>{children}</button>
);
