import { ReactComponent as ExtendIcon } from 'assets/icons/extend.svg';
import { FC } from 'react';
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
      context-menu-button
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
  <div className="context-menu-button-separator">
    <div className="context-menu-separator-line" />
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
        context-menu-extension-button
        ${disabled ? 'disabled' : 'enabled'}
    `}
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
