import useBlueprint from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { applyPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionUndo = () => {
  useVersionControl.setState(
    produce((draft: UseVersionControl) => {
      const inversePatches = draft.history[draft.index]?.inversePatches;

      if (inversePatches) {
        useBlueprint.setState(applyPatches(useBlueprint.getState(), inversePatches));
      }

      draft.index = Math.max(-1, draft.index - 1);
    }),
  );

  declareUnsavedChanges();
};
