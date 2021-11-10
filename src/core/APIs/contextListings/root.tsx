import { FunctionComponent } from 'react';
import * as ExtendContextListing from './extendButton';
import * as SeparatorContextListing from './separator';
import * as TextContextListing from './textButton';
import * as ToggleContextListing from './toggle';

export type contextMenuListing = {
  x?: number;
  y?: number;
  listing: Array<allTypes>;
};

export type type = {
  type: string;
  icon?: FunctionComponent;
};

export type allTypes =
  | ExtendContextListing.type
  | SeparatorContextListing.type
  | TextContextListing.type
  | ToggleContextListing.type;
