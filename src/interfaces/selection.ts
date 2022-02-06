import produce from 'immer';
import { getPartByAddress } from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import blueprintStore from 'stores/blueprint';
import selectionStore, { SelectionStore } from 'stores/selection';
import { Blueprint, PartAddress } from 'types/Blueprint';

export const selectParts = (addresses: PartAddress[]) => {
  let newSelections: PartAddress[] = [];

  blueprintStore.setState(
    produce((draft: Blueprint) => {
      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);

        if (!part.meta.selected) {
          part.meta.selected = true;
          newSelections.push(address);
        }
      });
    }),
  );

  selectionStore.setState((draft) => ({
    selections: [...draft.selections, ...newSelections],
  }));
};

export const selectPartsOnly = (addresses: PartAddress[]) => {
  const currentSelections = selectionStore.getState().selections;

  blueprintStore.setState(
    produce((draft: Blueprint) => {
      currentSelections.forEach((selectionAddress) => {
        const part = getPartByAddress(selectionAddress, draft);
        part.meta.selected = false;
      });

      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);
        part.meta.selected = true;
      });
    }),
  );

  selectionStore.setState({ selections: addresses });
};

export const selectPartsFromOnly = (
  startAddress: PartAddress,
  endAddress: PartAddress,
) => {
  // it's backwards, so why not select backwards
  const direction = getPartDirection(startAddress, endAddress);
  if (direction === -1) [startAddress, endAddress] = [endAddress, startAddress];

  /**
   *
   */
};

export const deselectParts = (addresses: PartAddress[]) => {
  blueprintStore.setState(
    produce((draft: Blueprint) => {
      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);
        part.meta.selected = false;
      });
    }),
  );

  selectionStore.setState(
    produce((draft: SelectionStore) => {
      addresses.forEach((address) => {
        forEachRight(draft.selections, (selection, index) => {
          if (isEqual(address, selection)) draft.selections.splice(index, 1);
        });
      });
    }),
  );
};

export const deselectAllParts = () => {};

export const togglePartsSelection = (addresses: PartAddress[]) => {
  let spliceAddresses: PartAddress[] = [];
  let insertAddresses: PartAddress[] = [];

  blueprintStore.setState(
    produce((draft: Blueprint) => {
      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);

        if (part.meta.selected) {
          spliceAddresses.push(address);
        } else {
          insertAddresses.push(address);
        }

        part.meta.selected = !part.meta.selected;
      });
    }),
  );

  selectionStore.setState(
    produce((draft: SelectionStore) => {
      spliceAddresses.forEach((address) => {
        forEachRight(draft.selections, (selection, index) => {
          if (isEqual(address, selection)) draft.selections.splice(index, 1);
        });
      });

      draft.selections.push(...insertAddresses);
    }),
  );
};

export const getPartDirection = (
  startPart: PartAddress,
  endPart: PartAddress,
): -1 | 1 => {
  return startPart.some((startRoute, index) => endPart[index] > startRoute)
    ? 1
    : -1;
};
