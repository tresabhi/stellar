import { FC, forwardRef, InputHTMLAttributes } from 'react';
import styles from './index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    {...props}
    className={`${props.className ?? ''} ${styles['properties-explorer']}`}
  >
    {children}
  </div>
);

export const Group: FC = ({ children }) => (
  <div className={styles.group}>{children}</div>
);

export const Title: FC = ({ children }) => (
  <span className={styles.title}>{children}</span>
);

export const Row: FC = ({ children }) => (
  <div className={styles.row}>{children}</div>
);

interface NamedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'small' | 'wide';
}
export const NamedInput = forwardRef<HTMLInputElement, NamedInputProps>(
  ({ label, type = 'small', ...props }, ref) => {
    return (
      <div
        className={`${styles['input']} ${
          type === 'small' ? styles.small : styles.wide
        }`}
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

export interface ToggleButtonProps
  extends InputHTMLAttributes<HTMLButtonElement> {
  initialState?: boolean;
}
export const ToggleButton: FC<ToggleButtonProps> = ({
  children,
  initialState = false,
  ...props
}) => {
  return (
    //@ts-ignore
    <button
      {...props}
      className={`${props.className ?? ''} ${styles['toggle']}`}
    >
      {children}
    </button>
  );
};
