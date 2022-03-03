import {
  getPartByAddress,
  mutateBlueprint,
  setPartsByAddresses,
} from 'interfaces/blueprint';
import { forEachRight, isEqual } from 'lodash';
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

    draft.selections.current = [...draft.selections.current, ...newSelections];
    draft.selections.last = addresses[addresses.length - 1];
  });
};

export const selectPartOnly = (address: PartAddress) =>
  selectPartsOnly([address]);

export const selectPartsOnly = (addresses: PartAddress[]) => {
  mutateBlueprint((draft) => {
    setPartsByAddresses(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    setPartsByAddresses(addresses, { meta: { selected: true } }, draft);

    draft.selections.current = addresses;
    draft.selections.last = addresses[addresses.length - 1];
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

    addresses.forEach((address) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(address, selection))
          draft.selections.current.splice(index, 1);
      });
    });
  });
};

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    setPartsByAddresses(
      draft.selections.current,
      { meta: { selected: false } },
      draft,
    );
    draft.selections.current = [];
  });
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

    spliceAddresses.forEach((address) => {
      forEachRight(draft.selections.current, (selection, index) => {
        if (isEqual(address, selection))
          draft.selections.current.splice(index, 1);
      });
    });

    draft.selections.current.push(...insertAddresses);
  });
};

export const getPartDirection = (
  startPart: PartAddress,
  endPart: PartAddress,
): -1 | 1 => {
  return startPart.some((startRoute, index) => endPart[index] > startRoute)
    ? 1
    : -1;
};
