import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { produceWithPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

// a let statement to avoid static checking error with 0
export let UNDO_LIMIT = 512;

export const mutateBlueprint = (producer: (state: Blueprint) => void) => {
  const [nextState, patches, inversePatches] = produceWithPatches(useBlueprint.getState(), producer);

  if (patches.length > 0) {
    useVersionControl.setState(
      produce<UseVersionControl>((draft) => {
        draft.history.splice(draft.index + 1, draft.history.length - draft.index - 1);

        draft.history.push({
          inversePatches: inversePatches,
          patches: patches,
        });

        if (UNDO_LIMIT === 0) {
          draft.index++;
        } else {
          if (draft.history.length > UNDO_LIMIT) {
            draft.history.shift();
          } else {
            draft.index++;
          }
        }
      }),
    );

    declareUnsavedChanges();
    useBlueprint.setState(nextState);
  } else {
    // TODO: warn in verbose mode
  }
};
