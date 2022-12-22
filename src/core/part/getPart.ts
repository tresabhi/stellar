import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';

export const getPart = <Type extends Part>(
  id: string,
  draft?: Blueprint,
): Type => {
  if (draft) {
    return draft.parts[id] as Type;
  }
  return getPart<Type>(id, useBlueprint.getState());
};
