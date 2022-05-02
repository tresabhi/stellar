import { FC, InputHTMLAttributes } from 'react';
import styles from '../index.module.scss';

export interface ToggleProps extends InputHTMLAttributes<HTMLButtonElement> {
  initialState?: boolean;
}
export const Toggle: FC<ToggleProps> = ({
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
