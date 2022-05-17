import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { UUID } from 'types/Parts';
import { translateParts } from './translateParts';

export const translatePart = (
  ID: UUID,
  x: number,
  y: number,
  state?: Blueprint,
) => {
  if (state) {
    translateParts([ID], x, y, state);
  } else {
    mutateBlueprint((draft) => {
      translatePart(ID, x, y, draft);
    });
  }
};
