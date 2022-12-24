import { Blueprint } from 'game/Blueprint';
import { PartWithScale } from 'game/parts/PartWithScale';
import mutateParts from './mutateParts';

export default function scaleParts(
  x: number,
  y: number,
  ids: string[],
  blueprint?: Blueprint,
) {
  mutateParts<PartWithScale>(
    ids,
    (draft) => {
      draft.o.x *= x;
      draft.o.y *= y;
    },
    false,
    blueprint,
  );
}
