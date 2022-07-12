import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { nanoid } from 'nanoid';

export const ID_LENGTH = 16;

export const generateId = (draft?: Blueprint): string => {
  if (draft) {
    while (true) {
      const id = nanoid(ID_LENGTH);
      if (!draft.parts.has(id)) return id;
    }
  } else {
    return generateId(useBlueprint.getState());
  }
};
