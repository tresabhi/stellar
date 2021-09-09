import { FC } from 'react';

import './index.scss';

const Container: FC = ({ children }) => {
  return <div className="device-picker-container">{children}</div>;
};

const List: FC = ({ children }) => {
  return <div className="device-picker-list">{children}</div>;
};

const Title: FC = ({ children }) => {
  return <h2 className="device-picker-title">{children}</h2>;
};

interface ICard {
  href: string;
  text?: string;
  recomended?: boolean;
}
const Card: FC<ICard> = ({ href, text, recomended, children }) => {
  return (
    <a href={href} className="device-picker-card">
      {children}
      {text}
      {recomended ? <p className="device-picker-recomended">Recommended</p> : null}
    </a>
  );
};

export default {
  Container,
  Card,

  Title,
  List,
};
