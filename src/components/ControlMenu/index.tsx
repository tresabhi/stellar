import { FC } from 'react';
import styles from './index.module.scss';

export const Container: FC = ({ children }) => (
  <div className={styles['control-menu']}>{children}</div>
);

interface ButtonProps {
  extension: JSX.Element;
}
export const Button: FC<ButtonProps> = ({ children, extension }) => {
  return (
    <button className={styles.button}>
      {children}
      {extension ? (
        <div className={styles.extension}>{extension}</div>
      ) : undefined}
    </button>
  );
};
