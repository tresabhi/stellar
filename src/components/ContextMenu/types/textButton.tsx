import { type as rootListingType } from './root';

export type type = rootListingType & {
  type: 'text_button';
  text: string;
  onClick: Function;
};
