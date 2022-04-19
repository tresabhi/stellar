import {
  FC,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  MutableRefObject,
  ReactNode
} from 'react';
import styles from './index.module.scss';

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

interface GroupProps {
  children: ReactNode;
}
export const Group: FC<GroupProps> = ({ children }) => (
  <div className={styles.group}>{children}</div>
);

interface TitleProps {
  children: ReactNode;
}
export const Title: FC<TitleProps> = ({ children }) => (
  <Row>
    <span className={styles.title}>{children}</span>
  </Row>
);

interface RowProps {
  children: ReactNode;
}
export const Row: FC<RowProps> = ({ children }) => (
  <div className={styles.row}>{children}</div>
);

interface NamedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: 'small' | 'wide';
}
export const NamedInput = forwardRef<HTMLInputElement, NamedInputProps>(
  ({ label, type = 'small', onClick, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
      (ref as MutableRefObject<HTMLInputElement>)?.current.focus();
      if (onClick) onClick(event);
    };

    return (
      <div
        className={`${styles['input']} ${
          type === 'wide' ? styles.wide : styles.small
        }`}
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
