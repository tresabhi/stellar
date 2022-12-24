import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Blueprint } from 'game/Blueprint';
import getParent from './getParent';

/**
 * Fork of `deleteParts` for selections splicing optimization
 */
export default function deletePartsBySelection(blueprint?: Blueprint) {
  if (blueprint) {
    [...blueprint.selections].forEach((selection) => {
      const parent = getParent(selection, blueprint) ?? blueprint;

      delete blueprint.parts[selection];

      if (parent) {
        parent.part_order.splice(parent.part_order.indexOf(selection), 1);
      }
    });

    blueprint.selections = [];
  } else {
    mutateBlueprint((draft) => {
      deletePartsBySelection(draft);
    });
  }
}
