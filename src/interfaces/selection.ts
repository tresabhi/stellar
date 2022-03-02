import produce from 'immer';
import {
  getPartByAddress,
  mutateBlueprint,
  setPartsByAddresses,
} from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
import selectionStore, { SelectionStore } from 'stores/selection';
import { PartAddress } from 'types/Blueprint';

export const selectPart = (address: PartAddress) => selectParts([address]);

export const selectParts = (addresses: PartAddress[]) => {
  let newSelections: PartAddress[] = [];

  mutateBlueprint((draft) => {
    addresses.forEach((address) => {
      const part = getPartByAddress(address, draft);

      if (part && !part.meta.selected) {
        part.meta.selected = true;
        newSelections.push(address);
      }
    });
  });

  selectionStore.setState((draft) => ({
    selections: [...draft.selections, ...newSelections],
    lastSelection: addresses[addresses.length - 1],
  }));
};

export const selectPartOnly = (address: PartAddress) =>
  selectPartsOnly([address]);

export const selectPartsOnly = (addresses: PartAddress[]) => {
  const currentSelections = selectionStore.getState().selections;

  mutateBlueprint((draft) => {
    setPartsByAddresses(
      currentSelections,
      { meta: { selected: false } },
      draft,
    );
    setPartsByAddresses(addresses, { meta: { selected: true } }, draft);
  });

  selectionStore.setState({
    selections: addresses,
    lastSelection: addresses[addresses.length - 1],
  });
};

export const selectPartsFrom = (
  startAddress: PartAddress,
  endAddress: PartAddress,
) => {};

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

export const unselectPart = (address: PartAddress) => unselectParts([address]);

export const unselectParts = (addresses: PartAddress[]) => {
  mutateBlueprint((draft) => {
    addresses.forEach((address) => {
      const part = getPartByAddress(address, draft);
      if (part) part.meta.selected = false;
    });
  });

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

export const unselectAllParts = () => {
  const selections = selectionStore.getState().selections;
  setPartsByAddresses(selections, { meta: { selected: false } });

  selectionStore.setState({ selections: [], lastSelection: undefined });
};

export const togglePartSelection = (address: PartAddress) =>
  togglePartsSelection([address]);

export const togglePartsSelection = (addresses: PartAddress[]) => {
  let spliceAddresses: PartAddress[] = [];
  let insertAddresses: PartAddress[] = [];

  mutateBlueprint((draft) => {
    addresses.forEach((address) => {
      const part = getPartByAddress(address, draft);

      if (part) {
        if (part.meta.selected) {
          spliceAddresses.push(address);
        } else {
          insertAddresses.push(address);
        }

        part.meta.selected = !part.meta.selected;
      }
    });
  });

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
