import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function selectConcurrent(
  ids: MethodIds,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    const normalizedIds = normalizeIds(ids);

    blueprint.selections.forEach((id) => {
      blueprint.parts[id].selected = false;
    });
    normalizedIds.forEach((id) => {
      blueprint.parts[id].selected = true;
    });

    blueprint.selections = normalizedIds;
  } else {
    mutateBlueprint((draft) => {
      selectConcurrent(ids, draft);
    });
  }
}
