import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props.className ?? ''} ${styles['side-bar']}`}>
    {children}
  </div>
);
