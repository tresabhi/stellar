import * as RootContextListing from './root';

export type type extends RootContextListing.type {
  type: 'text_button';
  text: string;
  onClick: () => void;
}
