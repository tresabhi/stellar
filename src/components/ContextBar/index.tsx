import { FC } from 'react';

import './index.scss';

const Container: FC = ({ children }) => {
  return <div className="context-bar">{children}</div>;
};

const Button: FC = ({ children }) => {
  return <button className="context-bar-button">{children}</button>;
};

export default Object.assign({
  Container,
  Button,
});
