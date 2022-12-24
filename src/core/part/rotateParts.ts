import { Blueprint } from 'game/Blueprint';
import { PartWithOrientation } from 'game/parts/PartWithOrientation';
import mutateParts from './mutateParts';

export default function rotateParts(
  z: number,
  ids: string[],
  blueprint?: Blueprint,
) {
  mutateParts<PartWithOrientation>(
    ids,
    (draft) => {
      draft.o.z += z;
    },
    false,
    blueprint,
  );
}
