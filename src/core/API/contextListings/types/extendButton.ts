import * as RootContextListing from './root';

export type type = RootContextListing.type & {
  type: 'extend_button';
  text: string;
  extend: RootContextListing.contextMenuListing;
};
