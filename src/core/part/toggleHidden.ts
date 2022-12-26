import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import mutateParts from './mutateParts';

export default function toggleHidden(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    if (typeof ids === 'string') {
      blueprint.parts[ids].hidden = !blueprint.parts[ids].hidden;
    } else {
      const firstHidden = blueprint.parts[ids[0]].hidden ?? true;
      const isMixed = ids.some(
        (id) => blueprint.parts[id].hidden !== firstHidden,
      );

      mutateParts(
        ids,
        (draft) => {
          draft.hidden = isMixed ? false : !firstHidden;
        },
        false,
        blueprint,
      );
    }
  } else {
    mutateBlueprint((draft) => toggleHidden(ids, draft));
  }
}
