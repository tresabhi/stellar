import { mutateBlueprint } from 'functions/blueprint';
import { deleteParts } from './deleteParts';

export const deletePartsBySelection = () => {
  mutateBlueprint((draft) => {
    deleteParts(draft.selections, draft);
    draft.selections = [];
  });
};
