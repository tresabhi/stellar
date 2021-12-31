import * as RootPart from 'core/API/part/types/root';
import { FC, useRef, useState } from 'react';
import './index.scss';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import { getPartIconComponent } from 'core/API/part';
import useKeybind from 'core/hooks/useKeybind';

export const Container: FC = ({ children }) => (
  <div className="parts-explorer">{children}</div>
);

interface ListingProps {
  data: RootPart.anyPartType;
}
/**
 * A component that represents a part, usually using in `SideBar`
 */
export const Listing: FC<ListingProps> = ({ data }) => {
  const Icon = getPartIconComponent(data.n);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const keybind = useKeybind(
    () => alert('hello world!'),
    [['Control', 'Shift'], 'Enter'],
  );

  return (
    <button className="parts-explorer-listing">
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
        // onKeyPress={(event) => {
        //   if (INPUT_BLUR_KEYS.includes(event.key)) buttonRef.current?.focus();
        // }}
        onKeyPress={keybind}
        className="parts-explorer-listing-label"
        defaultValue={data['.stellar'].label}
      />

      {/* visible */}
      {/* lock */}
    </button>
  );
};
