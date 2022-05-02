import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface GroupProps {
  children: ReactNode;
}
export const Group: FC<GroupProps> = ({ children }) => (
  <div className={styles.group}>{children}</div>
);
