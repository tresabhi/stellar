import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { AnyPart } from 'types/Parts';
import { getPart } from './getPart';
import { translatePart } from './translatePart';

export const translateTranslatableParts = (
  x: number,
  y: number,
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
            translatePart(part.id, x, y, state);
          }
        }
      });
    };

    translate(ids);
  } else {
    mutateBlueprint((draft) => {
      translateTranslatableParts(x, y, ids, draft);
    });
  }
};
