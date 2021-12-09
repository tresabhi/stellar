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
  return (
    <button className="button">
      {children}
      {extension ? <div className="extension">{extension}</div> : undefined}
    </button>
  );
};
