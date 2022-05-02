import ScrollableComponent, { ScrollableProps } from 'components/Scrollable';
import { FC } from 'react';
import styles from '../index.module.scss';

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
