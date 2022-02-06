import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as CheckmarkIcon } from 'assets/icons/checkmark.svg';
import { FC, InputHTMLAttributes, MouseEvent, useRef, useState } from 'react';
import styles from './index.module.scss';

export const Container: FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    //@ts-ignore
    if (document.activeElement?.blur) document.activeElement?.blur();
  };

  return (
    <div
      onClick={handleClick}
      ref={containerRef}
      className={styles['context-menu']}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends InputHTMLAttributes<HTMLDivElement> {
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

export const Separator = () => (
  <div className={styles.separator}>
    <div className={styles.line} />
  </div>
);

interface ExtensionProps {
  disabled?: boolean;
  extension: JSX.Element;
}
export const Extension: FC<ExtensionProps> = ({
  children,
  disabled = false,
  extension,
}) => {
  return (
    <div
      className={`${styles['extension-button']} ${
        disabled ? styles.disabled : styles.enabled
      }`}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles['icon-holder']}>
        <ArrowHeadRightIcon className={styles.icon} />
      </div>
      {extension ? (
        <div className={styles.extension}>{extension}</div>
      ) : undefined}
    </div>
  );
};

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
  };

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['toggle']} ${
        disabled ? styles.disabled : styles.enabled
      }`}
      onClick={handleClick}
    >
      <span className={styles.text}>{children}</span>
      <div className={styles['icon-holder']}>
        {state ? <CheckmarkIcon className={styles.icon} /> : undefined}
      </div>
    </div>
  );
};
