import { type as textButtonType } from './textButton';
import { type as extendButtonType } from './extendButton';
import { type as separatorType } from './separator';
import { type as toggleType } from './toggle';

export type type = {
  type: string;
};

export type contextMenuListing = {
  x?: number;
  y?: number;
  listing: Array<
    extendButtonType | separatorType | textButtonType | toggleType
  >;
};
