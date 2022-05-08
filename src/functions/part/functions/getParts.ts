import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const getParts = (IDs: UUID[], state?: Blueprint) =>
  IDs.map((ID) => getPart(ID, state));
