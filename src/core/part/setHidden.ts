import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function setHidden(
  ids: MethodIds,
  hidden: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalizeIds(ids).forEach((id) => {
      blueprint.parts[id].hidden = hidden;
    });
  } else {
    mutateBlueprint((draft) => setHidden(ids, hidden, draft));
  }
}
