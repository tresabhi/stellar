import { FC } from 'react';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import './index.scss';

const Container: FC = ({ children }) => {
  return <div className="explorer-container">{children}</div>;
};

const StaticContainer: FC = ({ children }) => {
  return <div className="explorer-static-container">{children}</div>;
};

interface IPartListing {
  icon: object;
}
const PartListing: FC<IPartListing> = ({ children, icon }) => {
  return (
    <button className="explorer-part-listing">
      {/* icon */}
      {icon}

      {/* text */}
      <input className="explorer-part-listing-input" defaultValue={children} />

      <DeleteIcon className="explorer-part-listing-icon" />
      <LockIcon className="explorer-part-listing-icon" />
      <EyeIcon className="explorer-part-listing-icon" />
    </button>
  );
};

const TabContainer: FC = ({ children }) => {
  return <div className="explorer-tab-container">{children}</div>;
};

const Tab: FC = ({ children }) => {
  return <div className="explorer-tab">{children}</div>;
};

export default {
  Container,
  StaticContainer,
  PartListing,
  TabContainer,
  Tab,
};
