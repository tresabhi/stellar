import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { getPart } from './getPart';

export const mutateParts = <Type extends Part>(
  ids: string[],
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  if (state) {
    ids.forEach((id) => {
      let part = getPart(id, state) as Type | undefined;
      if (part) mutator(part);
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(ids, mutator, draft);
    });
  }
};
