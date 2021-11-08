import { type as rootListingType } from './root';

export type type = rootListingType & {
  type: 'toggle';
  text: string;
  onClick: Function;
  default?: boolean;
};
