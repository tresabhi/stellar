import * as RootPart from 'core/API/part/types/root';
import selectionStore, { SelectionStoreType } from 'core/stores/selection';
import produce from 'immer';

export default function useSelection() {
  const hook = {
    selectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.add('selected');
      selectionStore.setState((state) => ({
        selections: [...state.selections, part.relations],
      }));
    },

    selectParts: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {},

    selectPartsOnly: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {},

    deselectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.remove('selected');
      selectionStore.setState(
        produce((state: SelectionStoreType) =>
          state.selections.splice(state.selections.indexOf(part.relations), 1),
        ),
      );
    },

    togglePartSelection: (part: RootPart.AnyPartType) => {
      if (part.relations.listingRef.current?.classList.contains('selected')) {
        hook.deselectPart(part);
      } else {
        hook.selectPart(part);
      }
    },

    selectPartOnly: (part: RootPart.AnyPartType) => {
      selectionStore.getState().selections.forEach((selection) => {
        selection.listingRef.current?.classList.remove('selected');
      });
      selectionStore.setState({
        selections: [part.relations],
        lastSelection: part.relations,
      });
      part.relations.listingRef?.current?.classList.add('selected');
    },
  };

  return hook;
}
