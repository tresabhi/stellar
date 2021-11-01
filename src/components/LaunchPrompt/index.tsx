import { FC } from 'react';
import { ReactComponent as PlanetIcon } from 'assets/icons/planet.svg';
import { ReactComponent as RocketIcon } from 'assets/icons/rocket.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as TextIcon } from 'assets/icons/text.svg';
import './index.scss';

export const ShadeContainer: FC = ({ children }) => (
  <div className="launch-prompt-shade-container">{children}</div>
);

export const Container: FC = ({ children }) => (
  <div className="launch-prompt-container">{children}</div>
);

export const SubContainer: FC = ({ children }) => (
  <div className="launch-prompt-subcontainer">{children}</div>
);

export const Separator = () => <div className="launch-prompt-separator"></div>;

export const Title: FC = ({ children }) => (
  <span className="launch-prompt-title">{children}</span>
);

export const DraftRow: FC = ({ children }) => (
  <div className="launch-prompt-draft-row">{children}</div>
);

type DraftTypeProps = {
  icon: Object;
  name: string;
  enabled: boolean;
};
export const DraftType: FC<DraftTypeProps> = ({
  icon,
  name,
  enabled = true,
}) => (
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

export const ResentsColumn: FC = ({ children }) => (
  <div className="launch-prompt-resents-column">{children}</div>
);

const listingIcons = new Map([
  ['blueprint', <RocketIcon />],
  ['system', <PlanetIcon />],
  ['translation', <TextIcon />],
  ['unknown', <SaveIcon />],
]);

type RecentListingProps = {
  type?: string;
  name: string;
};
export const RecentListing: FC<RecentListingProps> = ({
  type = 'unknown',
  name,
}) => (
  <button className="launch-prompt-resents-listing">
    {listingIcons.get(type)}
    <span className="launch-prompt-resents-listing-text">{name}</span>
  </button>
);

export const InvisibleVerticalSeparator = () => (
  <div className="invisible-vertical-separator" />
);
