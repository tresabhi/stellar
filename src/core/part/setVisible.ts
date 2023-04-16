import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeArray from 'utilities/normalizeArray';

export default function setVisible(
  ids: MethodIds,
  visible: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalizeArray(ids).forEach((id) => {
      blueprint.parts[id].visible = visible;
    });
  } else {
    mutateBlueprint((draft) => setVisible(ids, visible, draft));
  }
}
