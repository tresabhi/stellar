import { FunctionComponent } from 'react';
import { contextMenuListing, type as rootType } from './root';

export type type = rootType & {
  text: string;
  extend: contextMenuListing;
  icon?: FunctionComponent;
};
