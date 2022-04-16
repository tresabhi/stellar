import { UUID } from 'types/Parts';
import { Part } from './Part';

export interface Group extends Part {
  readonly n: 'Group';
  partOrder: UUID[];
}
