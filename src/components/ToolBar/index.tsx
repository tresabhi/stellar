import { FC } from "react";

import "./index.scss";

const Container: FC = ({ children }) => {
  return <div className="tool-bar">{children}</div>;
};

const Button: FC = ({ children }) => {
  return <button className="tool-bar-button">{children}</button>;
};

const Seperator = () => {
  return <div className="tool-bar-seperator" />;
};

interface ITextFeild {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
}
const TextFeild: FC<ITextFeild> = ({ defaultValue, prefix = "", suffix = "" }) => {
  return (
    <input
      className="tool-bar-text-feild"
      defaultValue={`${prefix}${defaultValue}${suffix}`}
    />
  );
};

const StaticIcon: FC = ({ children }) => {
  return (
    <div className="tool-bar-static-icon">
      {children}
    </div>
  )
};

export default Object.assign({
  Container,
  Button,
  Seperator,
  TextFeild,
  StaticIcon
});
