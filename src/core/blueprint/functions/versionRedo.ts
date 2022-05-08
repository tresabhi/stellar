import produce, { applyPatches } from 'immer';
import blueprintStore from 'stores/blueprint';
import versionControlStore, {
  VersionControlStore,
} from 'stores/versionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionRedo = () => {
  versionControlStore.setState(
    produce((draft: VersionControlStore) => {
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
