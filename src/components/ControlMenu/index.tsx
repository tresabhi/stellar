import { FC, useRef } from 'react';
import './index.scss';

/**
 * A container that holds control menu buttons buttons in the title bar
 */
export const Container: FC = ({ children }) => (
  <div className="control-menu">{children}</div>
);

type ButtonProps = {
  // TODO: make this not optional
  extension?: JSX.Element;
};
/**
 * A button that contains texts like `File`, `Edit`, `View`, etc. and usually
 * is extended with a context menu
 */
export const Button: FC<ButtonProps> = ({ children, extension }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const extensionRef = useRef<HTMLDivElement>(null);
  let buttonBoundingRect = buttonRef.current?.getBoundingClientRect();

  // functionally shown to assign the possibly changed bounding rect
  const handleButtonFocus = () => {
    if (extensionRef.current) {
      buttonBoundingRect = buttonRef.current!.getBoundingClientRect();

      extensionRef.current.style.top = `${buttonBoundingRect!.bottom}px`;
      extensionRef.current.style.left = `${buttonBoundingRect!.left}px`;

      extensionRef.current.classList.add('visible');
    }
  };

  const handleButtonBlur = () => {
    if (extensionRef.current) extensionRef.current.classList.remove('visible');
  };

  return (
    <button
      ref={buttonRef}
      className="button"
      onFocus={handleButtonFocus}
      onBlur={handleButtonBlur}
    >
      {children}
      {extension ? (
        <div
          ref={extensionRef}
          style={{
            top: buttonBoundingRect?.bottom,
            left: buttonBoundingRect?.left,
          }}
          className="extension"
        >
          {extension}
        </div>
      ) : undefined}
    </button>
  );
};
