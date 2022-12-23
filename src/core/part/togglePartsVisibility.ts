import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export default function togglePartsVisibility(
  ids: string[],
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const firstHidden = blueprint.parts[ids[0]].hidden ?? true;
    const isMixed = ids.some(
      (id) => blueprint.parts[id].hidden !== firstHidden,
    );

    mutateParts(
      ids,
      (draft) => {
        draft.hidden = isMixed ? false : !firstHidden;
      },
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => togglePartsVisibility(ids, draft));
  }
}
