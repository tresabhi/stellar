import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as NoEyeIcon } from 'assets/icons/no-eye.svg';
import * as RootBlueprint from 'core/APIs/blueprint/root';
import * as PartsAPI from 'core/APIs/parts';
import * as RootPart from 'core/APIs/parts/root';
import {
  FC,
  KeyboardEvent,
  memo,
  MouseEvent,
  SVGProps,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import UnitTextInput from '../UnitTextInput';
import './index.scss';

const INPUT_BLUR_KEYS = ['Enter', 'Escape'];

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
  parts: RootBlueprint.anyPartTypeArray;
  onPartDataMutate: Function;
  onPartDelete: Function;
  indented?: boolean;
  address?: Array<number>;
};
export const PartsListingContainer: FC<PartsListingContainerProps> = ({
  children,
  parts,
  onPartDataMutate,
  onPartDelete,
  indented = false,
  address = [],
}) => {
  const parsedArray = parts.map((partData, index) => {
    return (
      <PartListing
        onSelect={() => undefined}
        key={`part-${index}`}
        icon={PartsAPI.getPartIconComponent(partData.n) ?? LockIcon}
        defaultName={partData?.['.stellar']?.label}
        data={partData}
        address={[...address, index]}
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
    <div
      className={`
        listing-container
        ${indented ? 'indented' : ''}
      `}
    >
      {parts ? parsedArray : children}
    </div>
  );
};

type PartListingProps = {
  icon: FC<SVGProps<SVGSVGElement>>;
  defaultName: string;
  data: RootPart.anyPartType;
  address: Array<number>;
  onEyeClick: Function;
  onDeleteClick: Function;
  onLabelChange: Function;
  onSelect: (type: 'single' | 'multi' | 'list' | 'multi_list') => void;
};
export const PartListing: FC<PartListingProps> = memo(
  ({
    icon: Icon,
    defaultName,
    data,
    address,
    onEyeClick,
    onDeleteClick,
    onLabelChange,
    onSelect,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let previousLabel = defaultName;
    let focusable = false;

    useLayoutEffect(() => {
      if (inputRef?.current) inputRef.current.value = defaultName;
    }, [defaultName]);

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
      if (INPUT_BLUR_KEYS.includes(event.key)) inputRef.current?.blur();
    };

    let [expanded, setExpanded] = useState(false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      /**
       * empty       : only selection ("single")
       * ctrl        : one new selection ("multi")
       * shift       : everything from last selection to this selection
       *               ("list")
       * ctrl + shift: everything from last selection to this selection
       *               without forgetting the other selections
       *               ("milti_list")
       */
      onSelect(
        event.ctrlKey // is ctrl
          ? event.shiftKey // is ctrl shift
            ? 'multi_list' // is ctrl shift
            : 'multi' // is ctrl
          : event.shiftKey // is shift
          ? 'list' // is shift
          : 'single', // is single
      );
    };

    const handleGroupIconClick = () => {
      setExpanded((state) => !state);
    };

    return (
      <div className="part-listing">
        <button className="button" onClick={handleClick}>
          {data.n === 'Group' ? (
            expanded ? (
              <ExpandedIcon
                className="icon group"
                onClick={handleGroupIconClick}
              />
            ) : (
              <ExpandIcon
                className="icon group"
                onClick={handleGroupIconClick}
              />
            )
          ) : (
            <Icon className="icon" />
          )}

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
            className="quick-action left-most"
          />
          {data['.stellar'].visible ? (
            <EyeIcon onClick={() => onEyeClick()} className="quick-action" />
          ) : (
            <NoEyeIcon onClick={() => onEyeClick()} className="quick-action" />
          )}
        </button>

        {data.n === 'Group' && expanded ? (
          <PartsListingContainer
            parts={data.parts}
            onPartDataMutate={() => {}}
            onPartDelete={() => {}}
            indented={true}
          />
        ) : undefined}
      </div>
    );
  },
);

// TODO: Add function arguments and return value
type PropertyListingContainerProps = {
  parts: RootBlueprint.anyPartTypeArray;
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
  // TODO: give this types
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
