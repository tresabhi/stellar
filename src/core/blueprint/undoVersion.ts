import { mutateVersionControl } from 'core/app';
import { applyPatches } from 'immer';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { UseVersionControl } from 'stores/versionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const undoVersion = () => {
  mutateVersionControl((draft: UseVersionControl) => {
    const inversePatches = draft.history[draft.index]?.inversePatches;
    const { invalidateFrame } = useApp.getState().editor;

    if (inversePatches) {
      useBlueprint.setState(
        applyPatches(useBlueprint.getState(), inversePatches),
      );
    }

    draft.index = Math.max(-1, draft.index - 1);
    invalidateFrame && invalidateFrame();
  });

  declareUnsavedChanges();
};
