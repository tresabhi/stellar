import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';

export const hideParts = (ids: string[], draft?: Blueprint) => {
  if (draft) {
    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) part.hidden = true;
    });
  } else {
    mutateBlueprint((draft) => hideParts(ids, draft));
  }
};
