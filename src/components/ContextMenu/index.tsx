import { FC } from "react";

import "./index.scss";

const Container: FC = ({ children }) => {
  return <div className="context-menu">{children}</div>;
};

const Button: FC = ({ children }) => {
  return <button className="context-menu-button">{children}</button>;
};

export default Object.assign({
  Container,
  Button
});
