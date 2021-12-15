import * as RootContextListing from './root';

export interface type extends RootContextListing.type {
  type: 'extend_button';
  text: string;
  extend: RootContextListing.contextMenuListing;
}
