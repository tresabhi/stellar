import * as RootPart from 'core/API/part/types/root';
import { FC, useState } from 'react';
import './index.scss';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as ExpandedIcon } from 'assets/icons/expanded.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import { getPartIconComponent } from 'core/API/part';

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
  const [expanded, setExpanded] = useState(false);
  const Icon = getPartIconComponent(data.n);

  return (
    <button className="parts-explorer-listing">
      {/* indentations */}

      {/* expand/collapse and/or dependency graphs */}
      <button
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

      <span className="parts-explorer-listing-label">
        {data['.stellar'].label}
      </span>

      {/* visible */}
      {/* lock */}
    </button>
  );
};
