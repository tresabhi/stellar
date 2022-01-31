import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as CheckmarkIcon } from 'assets/icons/checkmark.svg';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

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
export const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  to,
  ...props
}) => (
  <div
    {...props}
    onClick={(event) => {
      if (to) window.open(to);

      if (props.onClick) props.onClick(event);
    }}
    className={`${props.className || ''} context-menu-button ${
      disabled ? 'disabled' : 'enabled'
    }`}
  >
    <span className="text">{children}</span>
  </div>
);

export const Separator = () => (
  <div className="context-menu-separator">
    <div className="context-menu-separator-line" />
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
