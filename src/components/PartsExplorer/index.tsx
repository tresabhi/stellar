import { FC } from 'react';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import './index.scss';

const Container: FC = ({ children }) => {
  return <div className="parts-explorer-container">{children}</div>;
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
      <input defaultValue={children} />

      <DeleteIcon />
      <LockIcon />
      <EyeIcon />
    </button>
  );
};

export default {
  Container,
  Button,
};
