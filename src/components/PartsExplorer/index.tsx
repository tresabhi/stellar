import * as RootPart from 'core/API/part/types/root';
import { FC, useState } from 'react';
import './index.scss';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';

export const Container: FC = ({ children }) => (
  <div className="parts-explorer">{children}</div>
);

/**
 * A component that represents a part, usually using in `SideBar`
 */
interface ListingProps {
  data: RootPart.anyPartType;
}
export const Listing: FC<ListingProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <button onClick={() => alert('woah')} className="parts-explorer-listing">
      {/* expand/collapse and dependency graphs */}
      <button
        onClick={(event) => {
          event.stopPropagation();
          setExpanded((state) => !state);
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

      {/* indentation and more dependency graphs */}
      {/* icon */}
      {/* name */}
      {/* visible */}
      {/* lock */}
    </button>
  );
};
