import { FC } from 'react';
import './index.scss';

const ShadeContainer: FC = ({ children }) => (
  <div className="launch-prompt-shade-container">{children}</div>
);

const Container: FC = ({ children }) => (
  <div className="launch-prompt-container">{children}</div>
);

const SubContainer: FC = ({ children }) => (
  <div className="launch-prompt-subcontainer">{children}</div>
);

const Seperator = () => <div className="launch-prompt-seperator"></div>;

const Title: FC = ({ children }) => (
  <span className="launch-prompt-title">{children}</span>
);

const DraftRow: FC = ({ children }) => (
  <div className="launch-prompt-draft-row">{children}</div>
);

interface IDraftType {
  icon: Object;
  name: string;
}
const DraftType: FC<IDraftType> = ({ icon, name }) => (
  <button className="launch-prompt-draft-type">
    {icon}
    <span className="launch-prompt-draft-type-text">{name}</span>
  </button>
);

const RecentsColumn: FC = ({ children }) => (
  <div className="launch-prompt-recents-column">{children}</div>
);

interface IRecentListing {
  icon: Object;
  name: string;
}
const RecentListing: FC<IRecentListing> = ({ icon, name }) => (
  <button className="launch-prompt-recents-listing">
    {icon}
    <span className="launch-prompt-recents-listing-text">{name}</span>
  </button>
);

const InvisibleVerticleSeperator = () => (
  <div className="invisible-verticle-seperator" />
);

export default Object.assign({
  ShadeContainer,
  Container,
  SubContainer,

  Seperator,
  InvisibleVerticleSeperator,

  Title,

  DraftRow,
  DraftType,

  RecentsColumn,
  RecentListing,
});
