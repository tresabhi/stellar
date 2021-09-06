import { FC } from 'react';

import './index.scss';

const Container: FC = ({ children }) => {
  return <div className="device-chooser-container">{children}</div>;
};

const List: FC = ({ children }) => {
  return <div className="device-chooser-list">{children}</div>;
};

const Title: FC = ({ children }) => {
  return <h2 className="device-chooser-title">{children}</h2>;
};

interface ICard {
  href: string;
  text?: string;
  recomended?: boolean;
}
const Card: FC<ICard> = ({ href, text, recomended, children }) => {
  return (
    <a href={href} className="device-chooser-card">
      {children}
      {text}
      {recomended ? <p className="device-chooser-recomended">Recommended</p> : null}
    </a>
  );
};

export default {
  Container,
  Title,
  List,
  Card,
};
