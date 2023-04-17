import { Part } from 'game/parts/Part';
import { nanoid } from 'nanoid';
import useBlueprint from 'stores/blueprint';

export const ID_LENGTH = 16;

export default function generatePartId(parts?: Record<string, Part>): string {
  if (parts) {
    let id = '';

    while (id.length === 0) {
      const possibleId = nanoid(ID_LENGTH);
      if (!parts[possibleId]) id = possibleId;
    }

    return id;
  }
  return generatePartId(useBlueprint.getState().parts);
}
