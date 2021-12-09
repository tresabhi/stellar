import { FC, useRef } from 'react';
import './index.scss';

import { ReactComponent as ExtendIcon } from 'assets/icons/extend.svg';

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
    <span className="text">{children}</span>
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
  return (
    <button
      className={`
        extension
        ${disabled ? 'disabled' : 'enabled'}
    `}
    >
      <span className="text">{children}</span>
      <div className="icon-holder">
        <ExtendIcon />
      </div>
      {extension ? <div className="extension">{extension}</div> : undefined}
    </button>
  );
};
