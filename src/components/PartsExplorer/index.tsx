import { FC } from 'react';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import './index.scss';

interface IContainer {
  withTitle?: boolean;
}
const Container: FC<IContainer> = ({ children, withTitle }) => {
  return (
    <div
      className={`
        parts-explorer-container
        ${withTitle ? 'with-title' : ''}
      `}>
      {children}
    </div>
  );
};

const StaticContainer: FC = ({ children }) => {
  return <div className="parts-explorer-static-container">{children}</div>;
};

interface IButton {
  icon: object;
}
const Button: FC<IButton> = ({ children, icon }) => {
  return (
    <button className="parts-explorer-button">
      {/* icon */}
      {icon}

      {/* text */}
      <input className="parts-explorer-button-input" defaultValue={children} />

      <DeleteIcon className="parts-explorer-button-icon" />
      <LockIcon className="parts-explorer-button-icon" />
      <EyeIcon className="parts-explorer-button-icon" />
    </button>
  );
};

const Title: FC = ({ children }) => {
  return <div className="parts-explorer-title">{children}</div>;
};

export default {
  Container,
  StaticContainer,
  Button,
  Title,
};
