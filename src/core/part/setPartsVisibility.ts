import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';

export default function setPartsVisibility(
  ids: string[],
  hidden: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    ids.forEach((id) => {
      blueprint.parts[id].hidden = hidden;
    });
  } else {
    mutateBlueprint((draft) => setPartsVisibility(ids, hidden, draft));
  }
}
