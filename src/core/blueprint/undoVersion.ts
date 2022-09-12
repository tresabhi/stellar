import { mutateVersionControl } from 'core/app';
import { applyPatches } from 'immer';
import useBlueprint from 'stores/useBlueprint';
import { UseVersionControl } from 'stores/useVersionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const undoVersion = () => {
  mutateVersionControl((draft: UseVersionControl) => {
    const inversePatches = draft.history[draft.index]?.inversePatches;

    if (inversePatches) {
      useBlueprint.setState(
        applyPatches(useBlueprint.getState(), inversePatches),
      );
    }

    draft.index = Math.max(-1, draft.index - 1);
  });

  declareUnsavedChanges();
};
