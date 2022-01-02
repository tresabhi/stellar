import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import { getPartIconComponent } from 'core/API/part';
import * as RootPart from 'core/API/part/types/root';
import createKeybind from 'core/functions/createKeybind';
import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import './index.scss';

/**
 * A container that holds a list of all parts in the blueprint.
 */
export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div {...props} className={`${props?.className} parts-explorer`}>
    {children}
  </div>
);

interface ListingProps {
  data: RootPart.AnyPartType;
  layer: number;
}
/**
 * A component that represents a part and provides a list of its children if
 * it has any. It also provides a buttons for quick basic actions on the part.
 */
export const Listing: FC<ListingProps> = ({ data, layer }) => {
  const Icon = getPartIconComponent(data.n);
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const keybind = createKeybind(() => buttonRef.current?.focus(), 'Enter');

  let children;

  if (data.n === 'Group') {
    children = data.parts.map((data) => (
      <Listing data={data} layer={layer + 1} />
    ));
  }

  return (
    <div tabIndex={-1} className="parts-explorer-listing">
      <div
        className="parts-explorer-listing-button"
        style={{ paddingLeft: `${16 * layer}px` }}
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
          }}
          className="parts-explorer-listing-label"
          defaultValue={data['.stellar'].label}
        />

        {/* visible */}
        {/* lock */}
      </div>
      {children ? (
        <Container
          style={{ display: expanded ? 'flex' : 'none' }}
          className="parts-explorer-listing-children-container"
        >
          {children}
        </Container>
      ) : undefined}
    </div>
  );
};
