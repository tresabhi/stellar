import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';

export interface ContainerProps {
  children: ReactNode;
}
export const Container: FC<ContainerProps> = ({ children }) => (
  <div className={styles['control-menu']}>{children}</div>
);
