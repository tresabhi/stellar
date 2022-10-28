import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';

export const mutateParts = <Type extends Part>(
  ids: string[],
  mutator: (draft: Type) => void,
  draft?: Blueprint,
  recursive = false,
) => {
  if (draft) {
    ids.forEach((id) => {
      const part = draft.parts.get(id) as Type | undefined;

      if (part) {
        if (recursive && part.n === 'Group') {
          mutateParts(
            (part as unknown as Group).part_order,
            mutator,
            draft,
            true,
          );
        } else {
          mutator(part);
        }
      }
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(ids, mutator, draft, recursive);
    });
  }
};
