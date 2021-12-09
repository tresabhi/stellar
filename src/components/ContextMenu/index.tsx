import { FC, useRef } from 'react';
import './index.scss';

/**
 * A container that holds context menu buttons
 */
export const Container: FC = ({ children }) => (
  <div className="context-menu">{children}</div>
);

/**
 * A button that holds text that describes action of the context menu listing
 */
type ButtonProps = {
  disabled?: boolean;
};
export const Button: FC<ButtonProps> = ({ children, disabled = false }) => (
  <button
    className={`
      button
      ${disabled ? 'disabled' : 'enabled'}
    `}
  >
    {children}
  </button>
);

/**
 * Used to separate two distinct groups in context menus
 */
export const Separator = () => (
  <div className="separator">
    <div className="line" />
  </div>
);

type ExtensionProps = {
  disabled?: boolean;
  extension: JSX.Element;
};
/**
 * A button that reveals a by-default collapsed component, usually a context
 * menu
 */
export const Extension: FC<ExtensionProps> = ({
  children,
  disabled = false,
  extension,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const extensionRef = useRef<HTMLDivElement>(null);
  let buttonBoundingRect = buttonRef.current?.getBoundingClientRect();

  const handleButtonFocus = () => {
    if (extensionRef.current) {
      buttonBoundingRect = buttonRef.current!.getBoundingClientRect();

      extensionRef.current.style.top = `${buttonBoundingRect!.top}px`;
      extensionRef.current.style.left = `${buttonBoundingRect!.right}px`;

      extensionRef.current.classList.add('visible');
    }
  };

  const handleButtonBlur = () => {
    if (extensionRef.current) extensionRef.current.classList.remove('visible');
  };

  return (
    <button
      ref={buttonRef}
      className={`
        extension
        ${disabled ? 'disabled' : 'enabled'}
    `}
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
