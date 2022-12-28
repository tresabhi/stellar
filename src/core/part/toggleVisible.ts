import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import mutateParts from './mutateParts';

export default function toggleVisible(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    if (typeof ids === 'string') {
      blueprint.parts[ids].visible = !blueprint.parts[ids].visible;
    } else {
      const firstHidden = blueprint.parts[ids[0]].visible ?? true;
      const isMixed = ids.some(
        (id) => blueprint.parts[id].visible !== firstHidden,
      );

      mutateParts(
        ids,
        (draft) => {
          draft.visible = isMixed ? false : !firstHidden;
        },
        false,
        blueprint,
      );
    }
  } else {
    mutateBlueprint((draft) => toggleVisible(ids, draft));
  }
}
