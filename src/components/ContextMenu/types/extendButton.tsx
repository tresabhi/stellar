import { contextMenuListing, type as rootListingType } from './root';

export type type = rootListingType & {
  type: 'extend_button';
  text: string;
  extend: contextMenuListing;
};
