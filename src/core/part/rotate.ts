import { Blueprint } from 'game/Blueprint';
import { PartWithOrientation } from 'game/parts/PartWithOrientation';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';
import mutateParts from './mutateParts';

export default function rotate(
  ids: MethodIds,
  z: number,
  blueprint?: Blueprint,
) {
  mutateParts<PartWithOrientation>(
    normalizeIds(ids),
    (draft) => {
      draft.o.z += z;
    },
    false,
    blueprint,
  );
}
