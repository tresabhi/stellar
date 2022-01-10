import * as RootPart from 'core/API/part/types/root';
import selectionStore, { SelectionStoreType } from 'core/stores/selection';
import produce from 'immer';

export default function useSelection() {
  const hook = {
    selectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.add('selected');
      selectionStore.setState((state) => ({
        selections: [...state.selections, part],
      }));
    },

    selectParts: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {
      // const startAddress = blueprint.getPartAddress(startPart);
      // const endAddress = blueprint.getPartAddress(endPart);
    },

    selectPartsOnly: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {},

    deselectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.remove('selected');
      selectionStore.setState(
        produce((state: SelectionStoreType) =>
          state.selections.splice(state.selections.indexOf(part), 1),
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
        selection.relations.listingRef.current?.classList.remove('selected');
      });
      selectionStore.setState({
        selections: [part],
        lastSelection: part,
      });
      part.relations.listingRef?.current?.classList.add('selected');
    },

    getPartDirection: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ): -1 | 0 | 1 => {
      return 0;
    },
  };

  return hook;
}
