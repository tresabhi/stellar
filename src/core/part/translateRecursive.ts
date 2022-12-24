import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalIds from 'utilities/normalIds';
import translate from './translate';

export default function translateRecursive(
  ids: MethodIds,
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const translateInternal = (selections: string[]) => {
      selections.forEach((selection) => {
        const part = blueprint.parts[selection];

        if (!part.locked) {
          if (part.n === 'Group') {
            translateInternal((part as Group).part_order);
          } else if ((part as PartWithTransformations).p) {
            translate(part.id, x, y, blueprint);
          }
        }
      });
    };

    translateInternal(normalIds(ids));
  } else {
    mutateBlueprint((draft) => {
      translateRecursive(ids, x, y, draft);
    });
  }
}
