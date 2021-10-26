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

type CardProps = {
  to: string;
  text?: string;
  recommended?: boolean;
};
const Card: FC<CardProps> = ({ to, text, recommended, children }) => {
  return (
    <Link to={to} className="device-picker-card">
      {children}
      {text}
      {recommended ? (
        <p className="device-picker-recommended">(Recommended)</p>
      ) : null}
    </Link>
  );
};

const Build: FC = () => {
  let version = 'v' + (MetaData?.version?.join('.') || 'Unknown');
  const unknownDomainName = 'Unknown Build';
  const domainNames = MetaData.builds;

  return (
    <span className="device-picker-build">
      {version +
        ' - ' +
        ((domainNames as any)[window.location.hostname] ?? unknownDomainName)}
    </span>
  );
};

export default {
  ...{
    Container,
    Card,

    Title,
    List,
    Build,
  },
};
