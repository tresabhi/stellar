import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalIds from 'utilities/normalIds';

export default function setHidden(
  ids: MethodIds,
  hidden: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalIds(ids).forEach((id) => {
      blueprint.parts[id].hidden = hidden;
    });
  } else {
    mutateBlueprint((draft) => setHidden(ids, hidden, draft));
  }
}
