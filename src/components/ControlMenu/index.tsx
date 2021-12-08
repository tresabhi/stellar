import { FC, useEffect, useRef } from 'react';
import './index.scss';

/**
 * A container that holds control menu buttons buttons in the title bar
 */
export const Container: FC = ({ children }) => (
  <div className="control-menu">{children}</div>
);

/**
 * A button that contains texts like `File`, `Edit`, `View`, etc. and can be
 * extended with a context menu
 */
type ButtonProps = {
  // TODO: make this not optional
  extension?: JSX.Element;
};
export const Button: FC<ButtonProps> = ({ children, extension }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button ref={buttonRef} className="button">
      {children}
      {extension ? (
        <div
          style={{
            left: buttonRef.current?.getBoundingClientRect().left,
            top: buttonRef.current?.getBoundingClientRect().bottom,
          }}
          className="extension"
        >
          {extension}
        </div>
      ) : undefined}
    </button>
  );
};
