import { Blueprint } from 'game/Blueprint';
import { PartWithOrientation } from 'game/parts/PartWithOrientation';
import { mutateParts } from './mutateParts';

export const rotateParts = (z: number, ids: string[], draft?: Blueprint) => {
  mutateParts<PartWithOrientation>(
    ids,
    (draft) => {
      draft.o.z += z;
    },
    draft,
  );
};
