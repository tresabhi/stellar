import { mutateVersionControl } from 'core/app';
import { applyPatches } from 'immer';
import useBlueprint from 'stores/useBlueprint';
import { UseVersionControl } from 'stores/useVersionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const redoVersion = () => {
  mutateVersionControl((draft: UseVersionControl) => {
    const patches = draft.history[draft.index + 1]?.patches;

    if (patches) {
      useBlueprint.setState(applyPatches(useBlueprint.getState(), patches));
    }

    draft.index = Math.min(draft.history.length - 1, draft.index + 1);
  });

  declareUnsavedChanges();
};
