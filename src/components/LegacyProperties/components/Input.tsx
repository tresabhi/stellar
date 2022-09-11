import {
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  MutableRefObject,
} from 'react';
import styles from '../index.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'compact' | 'half-width' | 'full-width'; // TODO: implement half-width
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'compact', onClick, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
      (ref as MutableRefObject<HTMLInputElement>)?.current.focus();
      if (onClick) onClick(event);
    };

    return (
      <div
        className={`${styles['input']} ${styles[type]}`}
        onClick={handleClick}
      >
        <span className={styles.label}>{label}</span>
        <input
          {...props}
          ref={ref}
          className={`${styles.value} ${props.className}`}
        />
      </div>
    );
  },
);
