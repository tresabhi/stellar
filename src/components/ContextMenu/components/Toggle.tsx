import { CheckIcon } from '@radix-ui/react-icons';
import { FC, InputHTMLAttributes, MouseEvent, useState } from 'react';
import styles from '../index.module.scss';

interface ToggleProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  defaultState?: boolean;
}
export const Toggle: FC<ToggleProps> = ({
  children,
  disabled = false,
  defaultState = false,
  ...props
}) => {
  const [state, setState] = useState(defaultState);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setState((state) => !state);
    if (props.onClick) props.onClick(event);

    (document.activeElement as HTMLElement | undefined)?.blur();
  };

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['toggle']} ${
        disabled ? styles.disabled : styles.enabled
      }`}
      onMouseUp={handleClick}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles['icon-holder']}>
        {state ? <CheckIcon className={styles.icon} /> : undefined}
      </div>
    </div>
  );
};
