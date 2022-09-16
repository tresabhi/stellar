import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/useBlueprint';

export const getParts = (
  ids: string[],
  draft?: Blueprint,
): (Part | undefined)[] => {
  if (draft) {
    return ids.map((id) => draft.parts.get(id));
  } else {
    return getParts(ids, useBlueprint.getState());
  }
};
