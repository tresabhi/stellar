import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Vector2 } from 'three';
import { UUID } from 'types/Parts';
import { translateParts } from './translateParts';

export const translatePart = (ID: UUID, vector: Vector2, state?: Blueprint) => {
  if (state) {
    translateParts([ID], vector, state);
  } else {
    mutateBlueprint((draft) => {
      translatePart(ID, vector, draft);
    });
  }
};
