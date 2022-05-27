import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import { nanoid } from 'nanoid';
import { ID_LENGTH } from '../constants/idLength';

export const generateId = (state?: Blueprint): string => {
  if (state) {
    while (true) {
      const id = nanoid(ID_LENGTH);
      if (!state.parts.has(id)) return id;
    }
  } else {
    return generateId(useBlueprint.getState());
  }
};
