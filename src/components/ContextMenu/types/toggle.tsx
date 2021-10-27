import { FunctionComponent } from 'react';
import { type as rootType } from './root';

export type type = rootType & {
  text: string;
  action: Function;
  icon?: FunctionComponent;
  default?: boolean;
};
