import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import group from './group';

export default function groupSelected(blueprint?: Blueprint) {
  if (blueprint && blueprint.part_selections.length > 0) {
    group(
      blueprint.part_selections,
      blueprint.part_selections[blueprint.part_selections.length - 1],
      blueprint,
    );
  } else {
    mutateBlueprint((draft) => {
      groupSelected(draft);
    });
  }
}
