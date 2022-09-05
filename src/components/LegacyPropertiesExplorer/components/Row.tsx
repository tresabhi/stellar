import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface RowProps {
  children: ReactNode;
}
export const Row: FC<RowProps> = ({ children }) => (
  <div className={styles.row}>{children}</div>
);
