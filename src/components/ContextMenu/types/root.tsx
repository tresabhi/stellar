import { FunctionComponent } from 'react';
import { type as extendButtonType } from './extendButton';
import { type as separatorType } from './separator';
import { type as textButtonType } from './textButton';
import { type as toggleType } from './toggle';

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
  | extendButtonType
  | separatorType
  | textButtonType
  | toggleType;
