import { Blueprint } from 'game/Blueprint';
import { PartWithScale } from 'game/parts/PartWithScale';
import { MethodIds } from 'types/Parts';
import normalIds from 'utilities/normalIds';
import mutateParts from './mutateParts';

export default function scaleParts(
  ids: MethodIds,
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  mutateParts<PartWithScale>(
    normalIds(ids),
    (draft) => {
      draft.o.x *= x;
      draft.o.y *= y;
    },
    false,
    blueprint,
  );
}
