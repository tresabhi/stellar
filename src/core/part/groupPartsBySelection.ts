import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import groupParts from './groupParts';

export default function groupPartsBySelection(blueprint?: Blueprint) {
  if (blueprint && blueprint.selections.length > 0) {
    groupParts(
      blueprint.selections,
      blueprint.selections[blueprint.selections.length - 1],
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => {
      groupPartsBySelection(draft);
    });
  }
}
