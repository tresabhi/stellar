import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { mutatePart } from './mutatePart';

export const togglePartVisibility = (id: string, draft?: Blueprint) => {
  if (draft) {
    mutatePart(
      id,
      (draft) => {
        draft.hidden = !draft.hidden;
      },
      draft,
    );
  } else {
    mutateBlueprint((draft) => togglePartVisibility(id, draft));
  }
};
