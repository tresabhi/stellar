import { FC, InputHTMLAttributes, MouseEvent } from 'react';
import styles from '../index.module.scss';

export interface ButtonProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  to?: string;
}
export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  to,
  ...props
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (to) window.open(to);
    if (props.onClick) props.onClick(event);

    (document.activeElement as HTMLElement | undefined)?.blur();
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      className={`${props.className ?? ''} ${styles.button} ${
        disabled ? styles.disabled : styles.enabled
      }`}
    >
      <span className={styles.text}>{children}</span>
    </div>
  );
};
