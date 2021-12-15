import * as RootContextListing from './root';

export interface type extends RootContextListing.type {
  type: 'toggle';
  text: string;
  onClick: () => void;
  default?: boolean;
}
