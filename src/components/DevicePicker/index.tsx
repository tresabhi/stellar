import { FC } from 'react';

import MetaData from '../../metadata.json';
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
      {recomended ? <p className="device-picker-recomended">(Recommended)</p> : null}
    </a>
  );
};

const Build: FC = () => {
  let version = 'v' + (MetaData?.version?.join('.') || 'Unknown');
  const unknownDomainName = 'Unkown Build';
  const domainNames = {
    'wddos.csb.app': 'Sandbox Build',

    'stellareditor.vercel.app': 'Release Build',
    'stellarbeta.vercel.app': 'Beta Build',
    'stellardev.vercel.app': 'Dev Build',
  };

  return <span className="device-picker-build">{version + ' - ' + ((domainNames as any)[window.location.hostname] ?? unknownDomainName)}</span>;
};

export default Object.assign({
  Container,
  Card,

  Title,
  List,
  Build,
});
