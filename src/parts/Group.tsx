import { AnyPart } from 'core/types/Parts';
import { merge } from 'lodash';
import { DefaultPartData } from './Default';

export type GroupData = DefaultPartData & {
  n: 'Group';
  parts: AnyPart[];

  p: never;
  o: never;
  t: never;
};

export const GroupData = merge({}, DefaultPartData, {
  n: 'Group',
  parts: [],
});
