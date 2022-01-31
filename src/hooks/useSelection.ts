import selectionStore, { SelectionStore } from 'stores/selection';
import { AnyPart } from 'types/Parts';
import produce from 'immer';

export default function useSelection() {
  const hook = {
    selectPart: (part: AnyPart) => {
      part.meta.listing?.current?.classList.add('selected');
      selectionStore.setState((state) => ({
        selections: [...state.selections, part.meta.ID],
      }));
    },

    selectParts: (startPart: AnyPart, endPart: AnyPart) => {
      // const startAddress = blueprint.getPartAddress(startPart);
      // const endAddress = blueprint.getPartAddress(endPart);
    },

    selectPartsOnly: (startPart: AnyPart, endPart: AnyPart) => {},

    deselectPart: (part: AnyPart) => {
      part.meta.listing?.current?.classList.remove('selected');
      selectionStore.setState(
        produce((state: SelectionStore) =>
          state.selections.splice(state.selections.indexOf(part.meta.ID), 1),
        ),
      );
    },

    togglePartSelection: (part: AnyPart) => {
      if (part.meta.listing?.current?.classList.contains('selected')) {
        hook.deselectPart(part);
      } else {
        hook.selectPart(part);
      }
    },

    selectPartOnly: (part: AnyPart) => {
      selectionStore.getState().selections.forEach((selection) => {
        const part = getPartByID(selection);
        part.meta.listing.current?.classList.remove('selected');
      });
      selectionStore.setState({
        selections: [part],
        lastSelection: part,
      });
      part.relations.listing?.current?.classList.add('selected');
    },

    getPartDirection: (startPart: AnyPart, endPart: AnyPart): -1 | 0 | 1 => {
      return 0;
    },
  };

  return hook;
}
