import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';

export default function selectConcurrent(
  ids: MethodIds,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const normalizedIds = normalizeArray(ids);

    blueprint.part_selections.forEach((selection) => {
      blueprint.parts[selection].selected = false;
    });
    normalizedIds.forEach((id) => {
      blueprint.parts[id].selected = true;
    });

    blueprint.part_selections = normalizedIds;
  } else {
    mutateBlueprint((draft) => {
      selectConcurrent(ids, draft);
    });
  }
}
