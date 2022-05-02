import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export interface TabProps extends InputHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export const Tab: FC<TabProps> = ({ children, selected = false, ...props }) => (
  //@ts-ignore
  <button
    className={`${styles.tab} ${selected ? styles.selected : ''}`}
    {...props}
  >
    {children}
  </button>
);
