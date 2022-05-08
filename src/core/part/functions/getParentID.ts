import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const getParentID = (ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? useBlueprint.getState();
  const part = getPart(ID, blueprintState);

  if (part) return part.parentID;
};
