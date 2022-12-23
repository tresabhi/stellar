import { mutateVersionControl } from 'core/app/mutateVersionControl';
import { Blueprint } from 'game/Blueprint';
import { produceWithPatches } from 'immer';
import useBlueprint from 'stores/blueprint';
import useSettings from 'stores/settings';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export default function mutateBlueprint(producer: (state: Blueprint) => void) {
  const [nextState, patches, inversePatches] = produceWithPatches(
    useBlueprint.getState(),
    producer,
  );

  if (patches.length > 0) {
    const { undoLimit } = useSettings.getState().editor;

    mutateVersionControl((draft) => {
      draft.history.splice(
        draft.index + 1,
        draft.history.length - draft.index - 1,
      );

      draft.history.push({
        inversePatches,
        patches,
      });

      if (undoLimit === 0) {
        draft.index += 1;
      } else if (draft.history.length > undoLimit) {
        draft.history.shift();
      } else {
        draft.index += 1;
      }
    });

    declareUnsavedChanges();
    useBlueprint.setState(nextState);
  } else {
    // TODO: warn in verbose mode
  }
}
