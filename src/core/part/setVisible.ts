import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

export default function setVisible(
  ids: MethodIds,
  visible: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    normalizeIds(ids).forEach((id) => {
      blueprint.parts[id].visible = visible;
    });
  } else {
    mutateBlueprint((draft) => setVisible(ids, visible, draft));
  }
}
