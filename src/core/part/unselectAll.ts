import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import mutateParts from './mutateParts';

export default function unselectAll(blueprint?: Blueprint) {
  if (blueprint) {
    mutateParts(
      blueprint.selections,
      (draft) => {
        draft.selected = false;
      },
      false,
      blueprint,
    );
    blueprint.selections = [];
  } else {
    mutateBlueprint((draft) => unselectAll(draft));
  }
}
