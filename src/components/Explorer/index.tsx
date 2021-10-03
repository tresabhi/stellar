import { FC } from 'react';

import UnitTextInput from '../UnitTextInput';

import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as LockIcon } from '../../assets/icons/lock.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

import './index.scss';

interface IContainer {
  rightSide?: boolean;
}
const Container: FC<IContainer> = ({ children, rightSide }) => {
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
  defaultName: string;
}
const PartListing: FC<IPartListing> = ({ children, icon, defaultName }) => {
  return (
    <button className="explorer-part-listing">
      {/* icon */}
      {icon}

      {/* text */}
      <input
        className="explorer-part-listing-input"
        defaultValue={defaultName}
      />

      <DeleteIcon className="explorer-part-listing-icon" />
      <LockIcon className="explorer-part-listing-icon" />
      <EyeIcon className="explorer-part-listing-icon" />
    </button>
  );
};

interface IPropertyListing {
  subProperties?: Array<object>;
}
const PropertyListing: FC<IPropertyListing> = ({ children, subProperties }) => {
  return (
    <div className="explorer-property-listing">
      {/* text */}
      {children}

      <div className="explorer-property-listing-sub-properties-container">
        {/* sub properties */}
        {subProperties?.map((component) => component)}
      </div>
    </div>
  );
};

interface ITab {
  defaultSelected?: boolean;
}
const Tab: FC<ITab> = ({ children, defaultSelected }) => {
  // let for now, react state hook in the future
  let selected = defaultSelected;
  return (
    <button
      className={`
        explorer-tab
        ${selected ? 'selected' : ''}
      `}
    >
      {children}
    </button>
  );
};

const StaticTab: FC<ITab> = ({ children }) => {
  return <div className="explorer-static-tab">{children}</div>;
};

interface ISubPropertyTextInput {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  name?: string;
}
const SubPropertyTextInput: FC<ISubPropertyTextInput> = ({
  children,
  defaultValue,
  prefix,
  suffix,
  name,
}) => {
  return (
    <div className="explorer-sub-property-text-input">
      <span>{name || children}</span>
      <UnitTextInput
        defaultValue={defaultValue}
        suffix={suffix}
        prefix={prefix}
      />
    </div>
  );
};

export default Object.assign({
  Container,
  TabsContainer,
  ListingContainer,

  Tab,
  StaticTab,

  PartListing,
  PropertyListing,

  SubPropertyTextInput,
});
