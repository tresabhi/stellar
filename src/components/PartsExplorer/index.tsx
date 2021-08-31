import { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div className="parts-explorer-root">{children}</div>;
};

interface IButton {
  icon: object;
}
const Button: FC<IButton> = ({ children, icon }) => {
  return (
    <button>
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
