import { FC } from 'react';
import { ReactComponent as PlanetIcon } from '../../assets/icons/planet.svg';
import { ReactComponent as RocketIcon } from '../../assets/icons/rocket.svg';
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg';
import { ReactComponent as TextIcon } from '../../assets/icons/text.svg';
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
  enabled: boolean;
}
const DraftType: FC<IDraftType> = ({ icon, name, enabled = true }) => (
  <button
    className={`
      launch-prompt-draft-type
      ${enabled ? 'enabled' : 'disabled'}
    `}
  >
    {icon}
    <span className="launch-prompt-draft-type-text">{name}</span>
  </button>
);

const RecentsColumn: FC = ({ children }) => (
  <div className="launch-prompt-recents-column">{children}</div>
);

const listingIcons = new Map([
  ['blueprint', <RocketIcon />],
  ['system', <PlanetIcon />],
  ['translation', <TextIcon />],
  ['unkown', <SaveIcon />],
]);
interface IRecentListing {
  type?: string;
  name: string;
}
const RecentListing: FC<IRecentListing> = ({ type = 'unkown', name }) => (
  <button className="launch-prompt-recents-listing">
    {listingIcons.get(type)}
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
