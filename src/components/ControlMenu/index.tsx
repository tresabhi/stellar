import { FC } from 'react';
import './index.scss';

export const Container: FC = ({ children }) => (
  <div className="control-menu">{children}</div>
);

interface ButtonProps {
  extension: JSX.Element;
}
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
