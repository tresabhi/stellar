import ScrollableComponent, { ScrollableProps } from 'components/Scrollable';
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

export const Scrollable: FC<ScrollableProps> = ({
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
