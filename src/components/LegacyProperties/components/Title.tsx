import { FC, ReactNode } from 'react';
import styles from '../index.module.scss';
import { Row } from './Row';

export interface TitleProps {
  children: ReactNode;
}
export const Title: FC<TitleProps> = ({ children }) => (
  <Row>
    <span className={styles.title}>{children}</span>
  </Row>
);
