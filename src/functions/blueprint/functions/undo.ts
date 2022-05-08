import produce, { applyPatches } from 'immer';
import blueprintStore from 'stores/blueprint';
import versionControlStore, {
  VersionControlStore,
} from 'stores/versionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const undo = () => {
  versionControlStore.setState(
    produce((draft: VersionControlStore) => {
      const undoPatch = draft.history[draft.index]?.undo;

      if (undoPatch) {
        blueprintStore.setState(
          applyPatches(blueprintStore.getState(), undoPatch),
        );
      }

      draft.index = Math.max(0, draft.index - 1);
    }),
  );

  declareUnsavedChanges();
};
