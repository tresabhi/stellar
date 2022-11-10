import { nanoid } from 'nanoid';
import useBlueprint from 'stores/blueprint';
import { PartMap } from 'types/Parts';

export const ID_LENGTH = 16;

export const generateId = (parts?: PartMap): string => {
  if (parts) {
    let id = '';

    while (id.length === 0) {
      const possibleId = nanoid(ID_LENGTH);
      if (!parts.has(possibleId)) id = possibleId;
    }

    return id;
  } else {
    return generateId(useBlueprint.getState().parts);
  }
};
