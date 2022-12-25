import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import group from './group';

export default function groupSelected(blueprint?: Blueprint) {
  if (blueprint && blueprint.selections.length > 0) {
    group(
      blueprint.selections,
      blueprint.selections[blueprint.selections.length - 1],
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => {
      groupSelected(draft);
    });
  }
}
