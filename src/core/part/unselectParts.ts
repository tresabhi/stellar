import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';

export default function unselectParts(ids: string[], blueprint?: Blueprint) {
  if (blueprint) {
    ids.forEach((id) => {
      blueprint.parts[id].selected = false;
    });

    blueprint.selections = blueprint.selections.filter(
      (selection) => !ids.includes(selection),
    );
  } else {
    mutateBlueprint((draft) => {
      unselectParts(ids, draft);
    });
  }
}
