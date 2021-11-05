import { FC, memo, useEffect, useRef } from 'react';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as FuelTankIcon } from 'assets/icons/fuel-tank.svg';
import { ReactComponent as NoEyeIcon } from 'assets/icons/no-eye.svg';
import { type as rootPartType } from 'core/hooks/useBlueprint/parts/Root';
import UnitTextInput from '../UnitTextInput';
import './index.scss';

const listingIcons = {
  'Fuel Tank': <FuelTankIcon />,
};

type ContainerProps = {
  rightSide?: boolean;
};
export const Container: FC<ContainerProps> = ({ children, rightSide }) => {
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

export const TabsContainer: FC = ({ children }) => (
  <div className="explorer-tabs-container">{children}</div>
);

type PartsListingContainerProps = {
  parts: Array<rootPartType>;
  onPartDataMutate: Function;
  onPartDelete: Function;
};
export const PartsListingContainer: FC<PartsListingContainerProps> = ({
  children,
  parts,
  onPartDataMutate,
  onPartDelete,
}) => {
  const parsedArray = parts.map((partData, index) => {
    return (
      <PartListing
        key={`part-${index}`}
        icon={(listingIcons as any)?.[partData.n] || <LockIcon />}
        defaultName={
          partData?.['.stellar']?.label ?? 'Internally Unlabeled Part'
        }
        visible={partData?.['.stellar']?.visible ?? true}
        onEyeClick={() => {
          onPartDataMutate(
            {
              '.stellar': { visible: !partData['.stellar'].visible },
            },
            index,
          );
        }}
        onDeleteClick={() => onPartDelete(index)}
        onLabelChange={(label: boolean) => {
          onPartDataMutate(
            {
              '.stellar': { label: label },
            },
            index,
          );
        }}
      />
    );
  });

  return (
    <div className="explorer-listing-container">
      {parts ? parsedArray : children}
    </div>
  );
};

type PartListingProps = {
  icon: Object;
  defaultName: string;
  visible: boolean;
  onEyeClick: Function;
  onDeleteClick: Function;
  onLabelChange: Function;
};
export const PartListing: FC<PartListingProps> = memo(
  ({
    icon,
    defaultName,
    visible,
    onEyeClick,
    onDeleteClick,
    onLabelChange,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let preLabel = defaultName;

    useEffect(() => {
      inputRef.current!.value = defaultName;
    });

    return (
      <button className="explorer-part-listing">
        {/* icon */}
        {icon}

        {/* text */}
        <input
          className="explorer-part-listing-input"
          ref={inputRef}
          onBlur={() => {
            if (preLabel !== inputRef.current?.value) {
              onLabelChange(inputRef.current?.value);
              preLabel = inputRef.current?.value!;
            }
          }}
        />

        <DeleteIcon
          onClick={() => {
            if (onDeleteClick) onDeleteClick();
          }}
          className="explorer-part-listing-icon"
        />
        {visible ? (
          <LockIcon
            onClick={() => onEyeClick()}
            className="explorer-part-listing-icon"
          />
        ) : (
          <NoEyeIcon
            onClick={() => onEyeClick()}
            className="explorer-part-listing-icon"
          />
        )}
      </button>
    );
  },
);

type PropertyListingProps = {
  subProperties?: Array<Object>;
};
export const PropertyListing: FC<PropertyListingProps> = ({
  children,
  subProperties,
}) => {
  return (
    <div className="explorer-property-listing">
      {/* text */}
      {children}

      <div className="explorer-property-listing-sub-properties-container">
        {/* sub properties */}
        {/* TODO: what the heck is this? */}
        {subProperties?.map((component) => component)}
      </div>
    </div>
  );
};

type TabProps = {
  defaultSelected?: boolean;
};
export const Tab: FC<TabProps> = ({ children, defaultSelected }) => {
  // const for now, react state hook in the future
  const selected = defaultSelected;
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

export const StaticTab: FC<TabProps> = ({ children }) => (
  <div className="explorer-static-tab">{children}</div>
);

type SubPropertyTextInputProps = {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  name?: string;
};
export const SubPropertyTextInput: FC<SubPropertyTextInputProps> = ({
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
