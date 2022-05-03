import { CheckIcon } from '@radix-ui/react-icons';
import { FC, InputHTMLAttributes, MouseEvent, useState } from 'react';
import styles from '../index.module.scss';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  defaultState?: boolean;
  onMutate?: (state: boolean) => void;
}
export const CheckBox: FC<CheckBoxProps> = ({
  children,
  disabled = false,
  defaultState = false,
  onMutate,
  ...props
}) => {
  const [state, setState] = useState(defaultState);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setState((state) => !state);

    (document.activeElement as HTMLElement | undefined)?.blur();

    if (onMutate) onMutate(!state);
    if (props.onClick) props.onClick(event);
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
