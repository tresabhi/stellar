import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { translatePart } from './translatePart';

export default function translateTranslatableParts(
  x: number,
  y: number,
  ids: string[],
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const translate = (selections: string[]) => {
      selections.forEach((selection) => {
        const part = blueprint.parts[selection];

        if (!part.locked) {
          if (part.n === 'Group') {
            translate((part as Group).part_order);
          } else if ((part as PartWithTransformations).p) {
            translatePart(part.id, x, y, blueprint);
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
}
