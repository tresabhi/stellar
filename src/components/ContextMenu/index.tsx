import { ReactComponent as CheckmarkIcon } from 'assets/icons/checkmark.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

/**
 * A container that holds context menu buttons.
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

interface ButtonProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  to?: string;
}
/**
 * A button that holds text that describes it's action, usually in a context
 * menu.
 */
export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  to,
  ...props
}) => (
  <div
    {...props}
    onClick={() => {
      if (to) window.open(to);
    }}
    className={`${props.className || ''} context-menu-button ${
      disabled ? 'disabled' : 'enabled'
    }`}
  >
    <span className="text">{children}</span>
  </div>
);

/**
 * Used to separate two distinct groups in context menus.
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
 * menu.
 */
export const Extension: FC<ExtensionProps> = ({
  children,
  disabled = false,
  extension,
}) => {
  return (
    <div
      className={`context-menu-extension-button ${
        disabled ? 'disabled' : 'enabled'
      }`}
    >
      <span className="context-menu-button-text">{children}</span>
      <div className="context-menu-button-icon-holder">
        <ArrowHeadRightIcon className="context-menu-button-icon" />
      </div>
      {extension ? (
        <div className="context-menu-extension-button-extension">
          {extension}
        </div>
      ) : undefined}
    </div>
  );
};

interface ToggleProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  defaultState?: boolean;
}
/**
 * A button that displays a boolean state through a check-mark, usually in a
 * context menu.
 */
export const Toggle: FC<ToggleProps> = ({
  children,
  disabled = false,
  defaultState = false,
  ...props
}) => {
  const [state, setState] = useState(defaultState);

  return (
    <div
      {...props}
      className={`${props.className || ''} context-menu-toggle-button ${
        disabled ? 'disabled' : 'enabled'
      }`}
      onClick={(event) => {
        setState((state) => !state);
        if (props.onClick) props.onClick(event);
      }}
    >
      <span className="context-menu-button-text">{children}</span>
      <div className="context-menu-button-icon-holder">
        {state ? (
          <CheckmarkIcon className="context-menu-button-icon" />
        ) : undefined}
      </div>
    </div>
  );
};
