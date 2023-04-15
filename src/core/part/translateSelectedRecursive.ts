import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import translateRecursive from './translateRecursive';

export default function translateSelectedRecursive(
  x: number,
  y: number,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    translateRecursive(blueprint.part_selections, x, y, blueprint);
  } else {
    mutateBlueprint((draft) => {
      translateSelectedRecursive(x, y, draft);
    });
  }
}
