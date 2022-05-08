import blueprintStore from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { applyPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionRedo = () => {
  useVersionControl.setState(
    produce((draft: UseVersionControl) => {
      const redoPatch = draft.history[draft.index]?.redo;

      if (redoPatch) {
        blueprintStore.setState(
          applyPatches(blueprintStore.getState(), redoPatch),
        );
      }

      draft.index = Math.min(draft.history.length - 1, draft.index + 1);
    }),
  );

  declareUnsavedChanges();
};
