import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { ReactComponent as NoEyeIcon } from 'assets/icons/no-eye.svg';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as PartsAPI from 'core/API/part';
import * as RootPart from 'core/API/part/types/root';
import DeepPartial from 'core/types/DeepPartial';
import {
  FC,
  memo,
  MouseEvent,
  SVGProps,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import UnitTextInput from '../UnitTextInput';
// import './index.scss';

const INPUT_BLUR_KEYS = ['Enter', 'Escape'];

interface ContainerProps {
  rightSide?: boolean;
}
export const Container: FC<ContainerProps> = ({
  children,
  rightSide,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`explorer-container ${rightSide ? 'right' : 'left'}`}
    >
      {children}
    </div>
  );
};

export const TabsContainer: FC = ({ children }) => (
  <div className="tabs-container">{children}</div>
);

interface PartsListingContainerProps {
  parts: RootBlueprint.anyPartTypeArray;
  indented?: boolean;
  parentAddress?: RootBlueprint.partAddress;
  visible?: boolean;
  onPartDataMutate: (
    data: RootPart.anyPartialPartType,
    address: RootBlueprint.partAddress,
  ) => void;
  onPartDelete: (address: RootBlueprint.partAddress) => void;
  onPartSelect: (
    type: RootBlueprint.selectionType,
    address: RootBlueprint.partAddress,
  ) => void;
}
export const PartsListingContainer: FC<PartsListingContainerProps> = ({
  children,
  parts,
  indented = false,
  parentAddress = [],
  visible = true,
  onPartDataMutate,
  onPartDelete,
  onPartSelect,
}) => {
  const parsedArray = parts.map((partData, index) => {
    return (
      <PartListing
        key={`part-${index}`}
        icon={PartsAPI.getPartIconComponent(partData.n) ?? LockIcon}
        defaultName={partData?.['.stellar']?.label}
        data={partData}
        address={[...parentAddress, index]}
        onDelete={(providedAddress) =>
          onPartDelete(providedAddress ?? [...parentAddress, index])
        }
        onDataMutate={(data, providedAddress) => {
          onPartDataMutate(data, providedAddress ?? [...parentAddress, index]);
        }}
        onSelect={onPartSelect}
      />
    );
  });

  return (
    <div
      className={`part-listing-container ${indented ? 'indented' : ''} ${
        visible ? 'visible' : ''
      }`}
    >
      {parts ? parsedArray : children}
    </div>
  );
};

interface PartListingProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  defaultName: string;
  data: RootPart.anyPartType;
  address: RootBlueprint.partAddress;
  onDelete: (address?: RootBlueprint.partAddress) => void;
  onDataMutate: (
    data: DeepPartial<RootPart.anyPartType>,
    address?: RootBlueprint.partAddress,
  ) => void;
  onSelect: (
    type: RootBlueprint.selectionType,
    address: RootBlueprint.partAddress,
  ) => void;
}
export const PartListing: FC<PartListingProps> = memo(
  ({
    icon: Icon,
    defaultName,
    data,
    address,
    onDelete,
    onDataMutate,
    onSelect,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const listingRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [expanded, setExpanded] = useState(false);

    let previousLabel = defaultName;
    let focusable = false;

    useLayoutEffect(() => {
      if (inputRef?.current) inputRef.current.value = defaultName;
    });

    const handleExpandClick = (event: MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();

      setExpanded((state) => !state);
    };

    const handleEyeClick = (event: MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();

      if (data['.stellar'].visible)
        listingRef.current?.classList.add('invisible');
      else listingRef.current?.classList.remove('invisible');

      (async () =>
        onDataMutate({ '.stellar': { visible: !data['.stellar'].visible } }))();
    };

    return (
      <div
        ref={listingRef}
        className={`part-listing ${
          data['.stellar'].visible ? '' : 'invisible'
        } ${data['.stellar'].selected ? 'selected' : ''}`}
      >
        <button
          ref={buttonRef}
          className="button"
          /**
           * Types of clicks:
           *
           * - none: one and only selection (`single`)
           *
           * - ctrl: one new selection (`multi`)
           *
           * - shift: everything from last selection to this selection (`list`)
           *
           * - ctrl + shift: everything from last selection to this selection without
           *   forgetting the other selections (`milti_list`)
           *
           */
          onClick={(event) => {
            onSelect(
              event.ctrlKey // is ctrl
                ? event.shiftKey // is ctrl shift
                  ? 'multi_list' // is ctrl shift
                  : 'multi' // is ctrl
                : event.shiftKey // is shift
                ? 'list' // is shift
                : 'single', // is single
              address,
            );
          }}
        >
          {data.n === 'Group' ? (
            expanded ? (
              <ExpandedIcon
                className="icon group"
                onClick={handleExpandClick}
              />
            ) : (
              <ExpandIcon className="icon group" onClick={handleExpandClick} />
            )
          ) : (
            <Icon className="icon" />
          )}

          <input
            onFocus={() => {
              if (!focusable) inputRef.current?.blur();
            }}
            onBlur={() => {
              inputRef.current!.value = inputRef.current?.value.trim() ?? '';
              focusable = false;

              if (previousLabel !== inputRef.current?.value) {
                onDataMutate({
                  '.stellar': { label: inputRef.current!.value },
                });
                previousLabel = inputRef.current?.value!;
              }
            }}
            onDoubleClick={() => {
              focusable = true;
              inputRef.current?.focus();
            }}
            onKeyPress={(event) => {
              if (INPUT_BLUR_KEYS.includes(event.key)) inputRef.current?.blur();
            }}
            className="input"
            placeholder="Unlabeled Part"
            ref={inputRef}
          />

          <DeleteIcon
            onClick={() => onDelete(address)}
            className="quick-action left-most"
          />
          {data['.stellar'].visible ? (
            <EyeIcon onClick={handleEyeClick} className="quick-action" />
          ) : (
            <NoEyeIcon onClick={handleEyeClick} className="quick-action" />
          )}
        </button>

        {data.n === 'Group' ? (
          <PartsListingContainer
            visible={expanded}
            parentAddress={address}
            parts={data.parts}
            indented={true}
            onPartDataMutate={onDataMutate}
            onPartDelete={onDelete}
            onPartSelect={onSelect}
          />
        ) : undefined}
      </div>
    );
  },
);

// TODO: Add function arguments and return value
export const PropertyListingContainer: FC = ({
  children,
  // parts,
  // currentPartIndex,
  // onPartDataMutate,
}) => {
  return <div className="property-listing-container">{children}</div>;
};

interface PropertyListingProps {
  // TODO: give this types
  subProperties?: object[];
}
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

interface TabProps {
  defaultSelected?: boolean;
}
export const Tab: FC<TabProps> = ({ children, defaultSelected }) => {
  // TODO: const for now, react state hook in the future
  const selected = defaultSelected;
  return (
    <button className={`tab ${selected ? 'selected' : ''}`}>{children}</button>
  );
};

export const StaticTab: FC<TabProps> = ({ children }) => (
  <div className="tab-static">{children}</div>
);

interface SubPropertyTextInputProps {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  name?: string;
}
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
