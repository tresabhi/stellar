import * as RootContextListing from './root';

export interface type extends RootContextListing.type {
  type: 'text_button';
  text: string;
  onClick: () => void;
}
