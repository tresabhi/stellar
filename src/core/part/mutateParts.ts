import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';

export default function mutateParts<Type extends Part>(
  ids: string[],
  mutator: (draft: Type, index: number) => void,
  recursive = false,
  blueprint?: Blueprint,
) {
  if (blueprint) {
    ids.forEach((id, index) => {
      const part = blueprint.parts[id] as Type;

      if (recursive && part.n === 'Group') {
        mutateParts(
          (part as unknown as Group).part_order,
          mutator,
          true,
          blueprint,
        );
      } else {
        mutator(part, index);
      }
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(ids, mutator, recursive, draft);
    });
  }
}
