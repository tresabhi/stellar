import { mutateBlueprint } from 'core/blueprint';
import { translateBoundingBox } from 'core/boundingBox';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Vector2 } from 'three';
import { AnyPart, UUID } from 'types/Parts';
import { getPart } from './getPart';
import { translatePart } from './translatePart';

export const translateTranslatableParts = (
  vector: Vector2,
  IDs: UUID[],
  state?: Blueprint,
) => {
  if (state) {
    const translate = (selections: UUID[]) => {
      selections.forEach((selection) => {
        const part = getPart(selection, state);

        if (part) {
          if (part.n === 'Group') {
            translate((part as Group).partOrder);
            translateBoundingBox(part.ID, vector, state);
          } else if ((part as AnyPart).p) {
            translatePart(part.ID, vector, state);
          }
        }
      });
    };

    translate(IDs);
  } else {
    mutateBlueprint((draft) => {
      translateTranslatableParts(vector, IDs, draft);
    });
  }
};
