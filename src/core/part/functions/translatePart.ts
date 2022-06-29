import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { translateParts } from './translateParts';

export const translatePart = (
  id: string,
  x: number,
  y: number,
  state?: Blueprint,
) => {
  if (state) {
    translateParts([id], x, y, state);
  } else {
    mutateBlueprint((draft) => {
      translatePart(id, x, y, draft);
    });
  }
};
