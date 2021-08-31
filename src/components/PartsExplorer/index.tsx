import { FC } from 'react';

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
      {children}
    </button>
  );
};

export default {
  Container,
  Button,
};
