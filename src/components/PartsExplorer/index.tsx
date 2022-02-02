import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import {
  getPartByAddress,
  getReactivePartByAddress,
} from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import { selectPartsOnly, togglePartsSelection } from 'interfaces/selection';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import blueprintStore from 'stores/blueprint';
import { PartAddress } from 'types/Blueprint';
import './index.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props.className || ''} parts-explorer`}>
    {children}
  </div>
);

interface ListingProps {
  indentation: number;
  address: PartAddress;
}
export const Listing: FC<ListingProps> = ({ indentation, address }) => {
  const [expanded, setExpanded] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let data = getReactivePartByAddress(address)!;
  const Icon = getPartModule(data.n, true).Icon;
  let childParts: JSX.Element[] | undefined;

  if (data.n === 'Group') {
    childParts = data.parts.map((data, index) => (
      <Listing
        key={`part-${index}`}
        address={[...address, index]}
        indentation={indentation + 1}
      />
    ));
  }

  blueprintStore.subscribe(
    (draft) => getPartByAddress(address, draft).meta.selected,
    (current) => listingRef.current?.classList.toggle('selected', current),
  );

  return (
    <div ref={listingRef} tabIndex={-1} className="parts-explorer-listing">
      <div
        className="parts-explorer-listing-button"
        style={{ paddingLeft: `${16 * indentation}px` }}
        onClick={(event) => {
          if (event.ctrlKey) {
            if (event.shiftKey) {
              // ctrl + shift
            } else {
              // ctrl
              togglePartsSelection([data.meta.address]);
            }
          } else if (event.shiftKey) {
            // shift
          } else {
            // no modifier
            selectPartsOnly([data.meta.address]);
          }
        }}
      >
        {/* indentations */}

        {/* expand/collapse and/or dependency graphs */}
        <button
          ref={buttonRef}
          onClick={(event) => {
            // stop parent from being clicked
            event.stopPropagation();
            setExpanded((state) => !state);
          }}
          onMouseDown={(event) => {
            // stop transfer of focus if it's a dropdown
            if (data.n === 'Group') event.preventDefault();
          }}
          className="parts-explorer-listing-expand"
        >
          {data.n === 'Group' ? (
            expanded ? (
              <ArrowHeadDownIcon className="parts-explorer-listing-expand-icon" />
            ) : (
              <ArrowHeadRightIcon className="parts-explorer-listing-expand-icon" />
            )
          ) : undefined}
        </button>

        <div className="parts-explorer-listing-icon-holder">
          {Icon ? (
            <Icon className="parts-explorer-listing-icon" />
          ) : (
            <QuestionMarkIcon className="parts-explorer-listing-icon" />
          )}
        </div>

        <input
          ref={inputRef}
          onMouseDown={(event) => {
            event.preventDefault();
            buttonRef.current?.focus();
          }}
          onDoubleClick={() => {
            inputRef.current?.focus();
          }}
          onBlur={() => {
            inputRef.current!.value = inputRef.current!.value.trim();
            data.meta.label = inputRef.current!.value;
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') buttonRef.current?.focus();
          }}
          className="parts-explorer-listing-label"
          defaultValue={data.meta.label}
        />

        {/* visible */}
        {/* lock */}
      </div>

      {childParts ? (
        <Container
          style={{ display: expanded ? 'flex' : 'none' }}
          className="parts-explorer-listing-children-container"
        >
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
};
