import useBlueprint from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { applyPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionRedo = () => {
  useVersionControl.setState(
    produce((draft: UseVersionControl) => {
      const patches = draft.history[draft.index + 1]?.patches;

      if (patches) {
        useBlueprint.setState(applyPatches(useBlueprint.getState(), patches));
      }

      draft.index = Math.min(draft.history.length - 1, draft.index + 1);
    }),
  );

  declareUnsavedChanges();
};
