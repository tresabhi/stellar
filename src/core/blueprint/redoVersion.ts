import { mutateVersionControl } from 'core/app';
import { applyPatches } from 'immer';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { UseVersionControl } from 'stores/versionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const redoVersion = () => {
  mutateVersionControl((draft: UseVersionControl) => {
    const patches = draft.history[draft.index + 1]?.patches;
    const { invalidateFrame } = useApp.getState().editor;

    if (patches) {
      useBlueprint.setState(applyPatches(useBlueprint.getState(), patches));
    }

    draft.index = Math.min(draft.history.length - 1, draft.index + 1);
    invalidateFrame && invalidateFrame();
  });

  declareUnsavedChanges();
};
