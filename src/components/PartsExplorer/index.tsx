import * as RootPart from 'core/API/part/types/root';
import { FC } from 'react';

export const Container: FC = ({ children }) => (
  <div className="parts-explorer">{children}</div>
);

/**
 * A component that represents a part, usually using in `SideBar`
 */
interface ListingProps {
  data: RootPart.anyPartType;
}
export const Listing: FC<ListingProps> = ({ children }) => (
  <button className="parts-explorer-listing">
    {/* dependency graphs */}
    {/* indentation and more dependency graphs */}
    {/* icon */}
    {/* name */}
    {/* visible */}
    {/* lock */}
  </button>
);
