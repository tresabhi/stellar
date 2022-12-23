import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import translateParts from './translateParts';

export default function translatePart(
  id: string,
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    translateParts([id], x, y, blueprint);
  } else {
    mutateBlueprint((draft) => {
      translatePart(id, x, y, draft);
    });
  }
}
