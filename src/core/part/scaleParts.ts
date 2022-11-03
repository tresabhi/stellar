import { Blueprint } from 'game/Blueprint';
import { PartWithScale } from 'game/parts/PartWithScale';
import { mutateParts } from './mutateParts';

export const scaleParts = (
  x: number,
  y: number,
  ids: string[],
  draft?: Blueprint,
) => {
  mutateParts<PartWithScale>(
    ids,
    (draft) => {
      draft.o.x *= x;
      draft.o.y *= y;
    },
    draft,
  );
};
