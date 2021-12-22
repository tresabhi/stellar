import { FC } from 'react';
import * as ExtendContextListing from './extendButton';
import * as SeparatorContextListing from './separator';
import * as TextContextListing from './textButton';
import * as ToggleContextListing from './toggle';

export interface contextMenuListing {
  x?: number;
  y?: number;
  listing: anyContextListingType[];
}

export type type {
  type: string;
  icon?: FC;
}

export type anyContextListingType =
  | ExtendContextListing.type
  | SeparatorContextListing.type
  | TextContextListing.type
  | ToggleContextListing.type;
