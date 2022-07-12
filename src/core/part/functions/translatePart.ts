import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { translateParts } from './translateParts';

export const translatePart = (
  id: string,
  x: number,
  y: number,
  draft?: Blueprint,
) => {
  if (draft) {
    translateParts([id], x, y, draft);
  } else {
    mutateBlueprint((draft) => {
      translatePart(id, x, y, draft);
    });
  }
};
