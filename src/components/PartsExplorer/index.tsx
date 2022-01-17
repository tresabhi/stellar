import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import { getPartIconComponent } from 'core/API/part';
import createKeybind from 'core/functions/createKeybind';
import useBlueprint from 'core/hooks/useBlueprint';
import useSelection from 'core/hooks/useSelection';
import selectionStore from 'core/stores/selection';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

/**
 * A container that holds a list of all parts in the blueprint.
 */
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
  address: RootBlueprint.PartAddress;
}
/**
 * A component that represents a part and provides a list of its children if
 * it has any. It also provides a buttons for quick basic actions on the part.
 */
export const Listing: FC<ListingProps> = ({ indentation, address }) => {
  const [expanded, setExpanded] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const keybind = createKeybind('Enter', () => buttonRef.current?.focus());
  const selection = useSelection();
  const blueprint = useBlueprint();

  let data = blueprint.getReactivePartByAddress(address)!;

  const Icon = getPartIconComponent(data.n);

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

  data.relations.listingRef = listingRef;

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
              selection.togglePartSelection(data);
            }
          } else if (event.shiftKey) {
            // shift
            const lastSelection = selectionStore.getState().lastSelection;

            if (lastSelection) {
              selection.selectParts(lastSelection.relations.partPointer, data);
            } else {
              selection.selectPartOnly(data);
            }
          } else {
            // no modifier
            selection.selectPartOnly(data);
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
              <ExpandedIcon className="parts-explorer-listing-expand-icon" />
            ) : (
              <ExpandIcon className="parts-explorer-listing-expand-icon" />
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
          onKeyPress={keybind}
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
            data.identity.label = inputRef.current!.value;
          }}
          className="parts-explorer-listing-label"
          defaultValue={data.identity.label}
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
