import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/useBlueprint';

export const getPart = <Type extends Part>(
  id: string,
  draft?: Blueprint,
): Type | undefined => {
  if (draft) {
    return draft.parts.get(id) as Type | undefined;
  } else {
    return getPart<Type>(id, useBlueprint.getState());
  }
};
