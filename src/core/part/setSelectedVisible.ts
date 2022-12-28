import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import setVisible from './setVisible';

export default function setSelectedVisible(
  visible: boolean,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    setVisible(blueprint.selections, visible, blueprint);
  } else {
    mutateBlueprint((draft) => setSelectedVisible(visible, draft));
  }
}
