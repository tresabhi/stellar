import produce from 'immer';
import { getPartByAddress } from 'interfaces/blueprint';
import { isEqual } from 'lodash';
import selectionStore, { SelectionStore } from 'stores/selection';
import { AnyPart } from 'types/Parts';

export default function useSelection() {
  const hook = {
    selectPart: (part: AnyPart) => {
      part.meta.listing?.current?.classList.add('selected');
      selectionStore.setState((state) => ({
        selections: [...state.selections, part.meta.address],
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
        produce((state: SelectionStore) => {
          let selectionIndex: number;

          state.selections.some((selection, index) => {
            if (isEqual(selection, part.meta.address)) {
              selectionIndex = index;
              return true;
            } else return false;
          });

          state.selections.splice(selectionIndex!, 1);
        }),
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
        const part = getPartByAddress(selection);
        part.meta.listing?.current?.classList.remove('selected');
      });

      selectionStore.setState({
        selections: [part.meta.address],
        lastSelection: part.meta.address,
      });
      part.meta.listing?.current?.classList.add('selected');
    },

    getPartDirection: (startPart: AnyPart, endPart: AnyPart): -1 | 0 | 1 => {
      return 0;
    },
  };

  return hook;
}
