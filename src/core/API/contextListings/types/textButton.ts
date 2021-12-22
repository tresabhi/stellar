import * as RootContextListing from './root';

export type type = RootContextListing.type & {
  type: 'text_button';
  text: string;
  onClick: () => void;
};
