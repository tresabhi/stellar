import { ReactComponent as CheckMarkIcon } from 'assets/icons/check-mark.svg';
import { ReactComponent as ExtendIcon } from 'assets/icons/extend.svg';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

/**
 * A container that holds context menu buttons
 */
export const Container: FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={() => {
        //@ts-ignore
        if (document.activeElement?.blur) document.activeElement?.blur();
      }}
      ref={containerRef}
      className="context-menu"
    >
      {children}
    </div>
  );
};

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  to?: string;

  // issue in React library; fixed here
  // TODO: pr this fix for react... too lazy rn
  type?: 'button' | 'reset' | 'submit';
}
/**
 * A button that holds text that describes it's action, usually in a context
 * menu
 */
export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  to,
  ...props
}) => (
  <button
    onClick={() => {
      if (to) window.open(to);
    }}
    {...props}
    className={`context-menu-button ${disabled ? 'disabled' : 'enabled'}`}
  >
    <span className="text">{children}</span>
  </button>
);

/**
 * Used to separate two distinct groups in context menus
 */
export const Separator = () => (
  <div className="context-menu-separator">
    <div className="context-menu-separator-line" />
  </div>
);

interface ExtensionProps {
  disabled?: boolean;
  extension: JSX.Element;
}
/**
 * A button that reveals a by-default collapsed component, usually in a context
 * menu
 */
export const Extension: FC<ExtensionProps> = ({
  children,
  disabled = false,
  extension,
}) => {
  return (
    <button
      className={`context-menu-extension-button ${
        disabled ? 'disabled' : 'enabled'
      }`}
    >
      <span className="context-menu-button-text">{children}</span>
      <div className="context-menu-button-icon-holder">
        <ExtendIcon className="context-menu-button-icon" />
      </div>
      {extension ? (
        <div className="context-menu-extension-button-extension">
          {extension}
        </div>
      ) : undefined}
    </button>
  );
};

interface ToggleProps {
  disabled?: boolean;
  defaultState?: boolean;
}
/**
 * A button that displays `true`/`false` through a check-mark, usually in a
 * context menu
 */
export const Toggle: FC<ToggleProps> = ({
  children,
  disabled = false,
  defaultState = false,
}) => {
  const [state, setState] = useState(defaultState);

  const handleOnClick = () => setState((state) => !state);

  return (
    <button
      className={`context-menu-toggle-button ${
        disabled ? 'disabled' : 'enabled'
      }`}
      onClick={handleOnClick}
    >
      <span className="context-menu-button-text">{children}</span>
      <div className="context-menu-button-icon-holder">
        {state ? (
          <CheckMarkIcon className="context-menu-button-icon" />
        ) : undefined}
      </div>
    </button>
  );
};
