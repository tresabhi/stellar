import { FC } from 'react';
import styles from './index.module.scss';

export const Container: FC = ({ children }) => (
  <div className={styles['control-menu']}>{children}</div>
);

interface ButtonProps {
  label: string;
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
