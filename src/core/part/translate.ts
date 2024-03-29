import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';
import mutateParts from './mutateParts';

export default function translate(
  ids: MethodIds,
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mutateParts<Part & PartWithTransformations>(
      normalizeArray(ids),
      (draft) => {
        draft.p.x += x;
        draft.p.y += y;
      },
      false,
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => {
      translate(ids, x, y, draft);
    });
  }
}
