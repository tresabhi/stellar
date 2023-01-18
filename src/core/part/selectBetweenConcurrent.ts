import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import selectBetween from './selectBetween';
import unselectAll from './unselectAll';

export default function selectBetweenConcurrent(
  originId: string,
  targetId: string,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    unselectAll(blueprint);
    selectBetween(originId, targetId, blueprint);
  } else {
    mutateBlueprint((draft) => {
      selectBetweenConcurrent(originId, targetId, draft);
    });
  }
}
