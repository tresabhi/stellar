import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { getPart } from './getPart';

export const getParts = (ids: string[], state?: Blueprint) => {
  if (state) {
    ids.map((id) => getPart(id, state));
  } else {
    getParts(ids, useBlueprint.getState());
  }
};
