import { FC } from 'react';
import './index.scss';

/**
 * A container that holds control menu buttons buttons in the title bar.
 */
export const Container: FC = ({ children }) => (
  <div className="control-menu">{children}</div>
);

interface ButtonProps {
  extension: JSX.Element;
}
/**
 * A button that contains texts like `File`, `Edit`, `View`, etc. usually is
 * extended with a context menu.
 */
export const Button: FC<ButtonProps> = ({ children, extension }) => {
  return (
    <button className="control-menu-button">
      {children}
      {extension ? (
        <div className="control-menu-button-extension">{extension}</div>
      ) : undefined}
    </button>
  );
};
