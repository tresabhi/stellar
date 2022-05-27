import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Vector2 } from 'three';
import { AnyPart } from 'types/Parts';
import { getPart } from './getPart';
import { translatePart } from './translatePart';

export const translateTranslatableParts = (
  vector: Vector2,
  ids: string[],
  state?: Blueprint,
) => {
  if (state) {
    const translate = (selections: string[]) => {
      selections.forEach((selection) => {
        const part = getPart(selection, state);

        if (part) {
          if (part.n === 'Group') {
            translate((part as Group).partOrder);
          } else if ((part as AnyPart).p) {
            translatePart(part.id, vector, state);
          }
        }
      });
    };

    translate(ids);
  } else {
    mutateBlueprint((draft) => {
      translateTranslatableParts(vector, ids, draft);
    });
  }
};
