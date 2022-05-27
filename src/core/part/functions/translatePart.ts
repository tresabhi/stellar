import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';
import { translateParts } from './translateParts';

export const translatePart = (
  id: string,
  vector: Vector2,
  state?: Blueprint,
) => {
  if (state) {
    translateParts([id], vector, state);
  } else {
    mutateBlueprint((draft) => {
      translatePart(id, vector, draft);
    });
  }
};
