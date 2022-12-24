import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import mutateParts from './mutateParts';

export default function translateParts(
  ids: string[],
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mutateParts<PartWithTransformations>(
      ids,
      (draft) => {
        draft.p.x += x;
        draft.p.y += y;
      },
      false,
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => {
      translateParts(ids, x, y, draft);
    });
  }
}
