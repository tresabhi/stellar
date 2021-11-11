import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as NoEyeIcon } from 'assets/icons/no-eye.svg';
import * as PartsAPI from 'core/APIs/parts';
import * as RootPart from 'core/APIs/parts/root';
import { FC, KeyboardEvent, memo, MouseEvent, useEffect, useRef } from 'react';
import UnitTextInput from '../UnitTextInput';
import './index.scss';

type ContainerProps = {
  rightSide?: boolean;
};
export const Container: FC<ContainerProps> = ({ children, rightSide }) => {
  return (
    <div
      className={`
        explorer-container
        ${rightSide ? 'right' : 'left'}
      `}
    >
      {children}
    </div>
  );
};

export const TabsContainer: FC = ({ children }) => (
  <div className="tabs-container">{children}</div>
);

type PartsListingContainerProps = {
  parts: Array<RootPart.anyPartType>;
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
        onSelect={() => undefined}
        key={`part-${index}`}
        icon={PartsAPI.getPartIconComponent(partData.n) ?? <LockIcon />}
        defaultName={partData?.['.stellar']?.label}
        visible={partData?.['.stellar']?.visible}
        onEyeClick={() => {
          onPartDataMutate(
            { '.stellar': { visible: !partData['.stellar'].visible } },
            index,
          );
        }}
        onDeleteClick={() => onPartDelete(index)}
        onLabelChange={(label: boolean) => {
          onPartDataMutate({ '.stellar': { label: label } }, index);
        }}
      />
    );
  });

  return (
    <div className="listing-container">{parts ? parsedArray : children}</div>
  );
};

type PartListingProps = {
  icon: Object;
  defaultName: string;
  visible: boolean;
  onEyeClick: Function;
  onDeleteClick: Function;
  onLabelChange: Function;
  onSelect: (
    event: MouseEvent<HTMLInputElement, MouseEvent>,
    isSingleSelect: boolean,
    isListSelect: boolean,
    isAdditiveSelect: boolean,
  ) => void;
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
    let previousLabel = defaultName;
    let focusable = false;

    const handleLabelUpdate = () => {
      if (inputRef?.current) inputRef.current.value = defaultName;
    };
    handleLabelUpdate();
    useEffect(handleLabelUpdate, [defaultName]);

    const handleFocus = () => {
      if (!focusable) inputRef.current?.blur();
    };

    const handleBlur = () => {
      inputRef.current!.value = inputRef.current?.value.trim() ?? '';
      focusable = false;

      if (previousLabel !== inputRef.current?.value) {
        onLabelChange(inputRef.current?.value);
        previousLabel = inputRef.current?.value!;
      }
    };

    const handleDoubleClick = () => {
      focusable = true;
      inputRef.current?.focus();
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') inputRef.current?.blur();
    };

    return (
      <button className="part-listing">
        {/* icon */}
        {icon}

        {/* text */}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onDoubleClick={handleDoubleClick}
          onKeyPress={handleKeyPress}
          className="input"
          placeholder="Unlabeled Part"
          ref={inputRef}
        />

        <DeleteIcon
          onClick={() => {
            onDeleteClick();
          }}
          className="icon"
        />
        {visible ? (
          <EyeIcon onClick={() => onEyeClick()} className="icon" />
        ) : (
          <NoEyeIcon onClick={() => onEyeClick()} className="icon" />
        )}
      </button>
    );
  },
);

// TODO: Add function arguments and return value
type PropertyListingContainerProps = {
  parts: Array<RootPart.anyPartType>;
  currentPartIndex: number;
  onPartDataMutate: Function;
};
export const PropertyListingContainer: FC<PropertyListingContainerProps> = ({
  parts,
  currentPartIndex,
  onPartDataMutate,
}) => {
  return <div />;
};

type PropertyListingProps = {
  subProperties?: Array<Object>;
};
export const PropertyListing: FC<PropertyListingProps> = memo(
  ({ children, subProperties }) => {
    return (
      <div className="property-listing">
        {/* text */}
        {children}

        <div className="sub-properties-container">
          {/* sub properties */}
          {/* TODO: what the heck is this? */}
          {subProperties?.map((component) => component)}
        </div>
      </div>
    );
  },
);

type TabProps = {
  defaultSelected?: boolean;
};
export const Tab: FC<TabProps> = ({ children, defaultSelected }) => {
  // TODO: const for now, react state hook in the future
  const selected = defaultSelected;
  return (
    <button
      className={`
        tab
        ${selected ? 'selected' : ''}
      `}
    >
      {children}
    </button>
  );
};

export const StaticTab: FC<TabProps> = ({ children }) => (
  <div className="tab-static">{children}</div>
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
    <div className="explorer-input">
      <span>{name || children}</span>
      <UnitTextInput
        defaultValue={defaultValue}
        suffix={suffix}
        prefix={prefix}
      />
    </div>
  );
};
