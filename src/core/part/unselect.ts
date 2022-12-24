import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';

export default function unselect(ids: MethodIds, blueprint?: Blueprint) {
  if (blueprint) {
    if (typeof ids === 'string') {
      blueprint.parts[ids].selected = false;
      blueprint.selections.splice(blueprint.selections.indexOf(ids), 1);
    } else {
      ids.forEach((id) => {
        blueprint.parts[id].selected = false;
      });

      blueprint.selections = blueprint.selections.filter(
        (selection) => !ids.includes(selection),
      );
    }
  } else {
    mutateBlueprint((draft) => {
      unselect(ids, draft);
    });
  }
}
