import { forwardRef, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export const Container = forwardRef<
  HTMLDivElement,
  InputHTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`${props.className ?? ''} ${styles['properties-explorer']}`}
  >
    {children}
  </div>
));
