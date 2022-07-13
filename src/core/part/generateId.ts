import useBlueprint from 'hooks/useBlueprint';
import { nanoid } from 'nanoid';
import { AnyPartMap } from 'types/Parts';

export const ID_LENGTH = 16;

export const generateId = (parts?: AnyPartMap): string => {
  if (parts) {
    while (true) {
      const id = nanoid(ID_LENGTH);
      if (!parts.has(id)) return id;
    }
  } else {
    return generateId(useBlueprint.getState().parts);
  }
};
