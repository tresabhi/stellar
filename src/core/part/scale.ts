import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { PartWithScale } from 'game/parts/PartWithScale';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import mutateParts from './mutateParts';

export default function scaleParts(
  ids: MethodIds,
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  mutateParts<Part & PartWithScale>(
    normalizeIds(ids),
    (draft) => {
      draft.o.x *= x;
      draft.o.y *= y;
    },
    false,
    blueprint,
  );
}
