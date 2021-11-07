import { FC } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../../metadata.json';
import './index.scss';

export const Container: FC = ({ children }) => (
  <div className="device-picker-container">{children}</div>
);

export const List: FC = ({ children }) => (
  <div className="card-list">{children}</div>
);

export const Title: FC = ({ children }) => (
  <h2 className="title">{children}</h2>
);

type CardProps = {
  to: string;
  text?: string;
  recommended?: boolean;
};
export const Card: FC<CardProps> = ({ to, text, recommended, children }) => {
  return (
    <Link to={to} className="card">
      {children}
      {text}
      {recommended ? <p className="recommended-text">(Recommended)</p> : null}
    </Link>
  );
};

export const Build: FC = () => {
  let version = 'v' + (MetaData?.version?.join('.') || 'Unknown');
  const unknownDomainName = 'Unknown Build';
  const domainNames = MetaData.builds;

  return (
    <span className="build">
      {version +
        ' - ' +
        ((domainNames as any)[window.location.hostname] ?? unknownDomainName)}
    </span>
  );
};
