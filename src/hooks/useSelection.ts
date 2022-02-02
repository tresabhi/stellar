import produce from 'immer';
import { getPartByAddress } from 'interfaces/blueprint';
import blueprintStore from 'stores/blueprint';
import selectionStore from 'stores/selection';
import { Blueprint, PartAddress } from 'types/Blueprint';

export const selectParts = (addresses: PartAddress[]) => {
  blueprintStore.setState(
    produce((draft: Blueprint) => {
      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);
        part.meta.selected = true;
      });
    }),
  );
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
};

export const togglePartsSelection = (addresses: PartAddress[]) => {
  blueprintStore.setState(
    produce((draft: Blueprint) => {
      addresses.forEach((address) => {
        const part = getPartByAddress(address, draft);
        part.meta.selected = !part.meta.selected;
      });
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
