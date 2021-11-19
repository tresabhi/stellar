import * as RootContextListing from './root';

export type type = RootContextListing.type & {
  type: 'toggle';
  text: string;
  onClick: () => void;
  default?: boolean;
};
