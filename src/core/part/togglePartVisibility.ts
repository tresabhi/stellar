import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mutatePart from './mutatePart';

export default function togglePartVisibility(
  id: string,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    mutatePart(
      id,
      (draft) => {
        draft.hidden = !draft.hidden;
      },
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => togglePartVisibility(id, draft));
  }
}
