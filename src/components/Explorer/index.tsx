import { FC } from 'react';

import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';

import './index.scss';

interface IContainer {
  rightSide: boolean;
}
const Container: FC = ({ children, rightSide }) => {
  return (
    <div
      className={`
        explorer-container
        ${rightSide ? 'right-side' : 'left-side'}
      `}
    >
      {children}
    </div>
  );
};

const TabsContainer: FC = ({ children }) => {
  return <div className="explorer-tabs-container">{children}</div>;
};

const ListingContainer: FC = ({ children }) => {
  return <div className="explorer-listing-container">{children}</div>;
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

const Tab: FC = ({ children }) => {
  return <button className="explorer-tab">{children}</button>;
};

export default {
  Container,
  TabsContainer,
  ListingContainer,
  PartListing,
  Tab,
};
