import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutateParts } from './mutateParts';

export default function unselectAllParts(blueprint?: Blueprint) {
  if (blueprint) {
    mutateParts(
      blueprint.selections,
      (draft) => {
        draft.selected = false;
      },
      blueprint,
    );
    blueprint.selections = [];
  } else {
    mutateBlueprint((draft) => unselectAllParts(draft));
  }
}
