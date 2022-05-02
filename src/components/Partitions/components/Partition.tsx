import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

interface PartitionProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export const Partition: FC<PartitionProps> = ({
  children,
  selected = false,
  ...props
}) => (
  //@ts-ignore
  <button
    className={`${styles.option} ${selected ? styles.selected : ''}`}
    {...props}
  >
    {children}
  </button>
);
