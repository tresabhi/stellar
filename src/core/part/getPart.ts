import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'stores/useBlueprint';
import { AnyPart } from 'types/Parts';

export const getPart = <Type extends AnyPart>(
  id: string,
  draft?: Blueprint,
): Type | undefined => {
  if (draft) {
    return draft.parts.get(id) as Type | undefined;
  } else {
    return getPart<Type>(id, useBlueprint.getState());
  }
};
