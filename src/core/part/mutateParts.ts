import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';

export const mutateParts = <Type extends Part>(
  ids: string[],
  mutator: (draft: Type) => void,
  draft?: Blueprint,
) => {
  if (draft) {
    ids.forEach((id) => {
      const part = draft.parts.get(id) as Type | undefined;
      if (part) mutator(part);
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(ids, mutator, draft);
    });
  }
};
