import { FC } from 'react';

const Container: FC = ({ children }) => {
  return <div />;
};

interface IButton {
  text: string;
}
const Button: FC<IButton> = ({ children, text }) => {
  return (
    <button>
      {/* icon */}
      {children}

      {/* text... obviously */}
      {text}
    </button>
  );
};

export default {
  Container,
  Button,
};
