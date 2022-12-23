import { invalidate } from '@react-three/fiber';
import { mutateVersionControl } from 'core/app/mutateVersionControl';
import { applyPatches } from 'immer';
import useBlueprint from 'stores/blueprint';
import { UseVersionControl } from 'stores/versionControl';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export default function redoVersion() {
  mutateVersionControl((draft: UseVersionControl) => {
    const patches = draft.history[draft.index + 1]?.patches;

    if (patches) {
      useBlueprint.setState(applyPatches(useBlueprint.getState(), patches));
    }

    draft.index = Math.min(draft.history.length - 1, draft.index + 1);
    invalidate();
  });

  declareUnsavedChanges();
}
