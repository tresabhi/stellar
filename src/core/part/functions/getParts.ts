import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const getParts = (IDs: UUID[], state?: Blueprint) => {
  if (state) {
    IDs.map((ID) => getPart(ID, state));
  } else {
    getParts(IDs, useBlueprint.getState());
  }
};
