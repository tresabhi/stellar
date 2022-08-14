import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/useBlueprint';
import { AnyPart } from 'types/Parts';

export const getParts = (
  ids: string[],
  draft?: Blueprint,
): (AnyPart | undefined)[] => {
  if (draft) {
    return ids.map((id) => draft.parts.get(id));
  } else {
    return getParts(ids, useBlueprint.getState());
  }
};
