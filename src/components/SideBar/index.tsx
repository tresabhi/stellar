import ScrollableComponent from 'components/Scrollable';
import { FC, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props.className ?? ''} ${styles['side-bar']}`}>
    {children}
  </div>
);

export const Scrollable: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <ScrollableComponent
    {...props}
    className={`${styles.scrollable} ${className ?? ''}`}
  >
    {children}
  </ScrollableComponent>
);
