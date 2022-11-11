import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';

export const getParts = (
  ids: string[],
  draft?: Blueprint,
): (Part | undefined)[] => {
  if (draft) {
    return ids.map((id) => draft.parts[id]);
  } else {
    return getParts(ids, useBlueprint.getState());
  }
};
