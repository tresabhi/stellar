import * as RootContextListing from './root';

export type type extends RootContextListing.type {
  type: 'extend_button';
  text: string;
  extend: RootContextListing.contextMenuListing;
}
