import { FC } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../../metadata.json';
import './index.scss';

const Container: FC = ({ children }) => (
  <div className="device-picker-container">{children}</div>
);

const List: FC = ({ children }) => (
  <div className="device-picker-list">{children}</div>
);

const Title: FC = ({ children }) => (
  <h2 className="device-picker-title">{children}</h2>
);

interface ICard {
  to: string;
  text?: string;
  recomended?: boolean;
}
const Card: FC<ICard> = ({ to, text, recomended, children }) => {
  return (
    <Link to={to} className="device-picker-card">
      {children}
      {text}
      {recomended ? (
        <p className="device-picker-recomended">(Recommended)</p>
      ) : null}
    </Link>
  );
};

const Build: FC = () => {
  let version = 'v' + (MetaData?.version?.join('.') || 'Unknown');
  const unknownDomainName = 'Unkown Build';
  const domainNames = MetaData.builds;

  return (
    <span className="device-picker-build">
      {version +
        ' - ' +
        ((domainNames as any)[window.location.hostname] ?? unknownDomainName)}
    </span>
  );
};

export default Object.assign({
  Container,
  Card,

  Title,
  List,
  Build,
});
