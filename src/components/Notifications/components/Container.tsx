import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>{children}</div>
  );
};
