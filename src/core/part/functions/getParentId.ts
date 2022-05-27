import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { getPart } from './getPart';

export const getParentId = (partId: string, state?: Blueprint) => {
  const blueprintState = state ?? useBlueprint.getState();
  const part = getPart(partId, blueprintState);

  if (part) return part.parentId;
};
