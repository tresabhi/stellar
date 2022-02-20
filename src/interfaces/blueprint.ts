import produce from 'immer';
import { cloneDeep, isMap, merge } from 'lodash';
import { Group } from 'parts/Group';
import blueprintStore from 'stores/blueprint';
import selectionStore from 'stores/selection';
import DeepPartial from 'types/DeepPartial';
import { AnyPart, AnyVanillaPart } from 'types/Parts';
import { v4 as UUIDV4 } from 'uuid';
import {
  Blueprint,
  PartAddress,
  PartsMap as AnyPartMap,
  VanillaBlueprint,
} from '../types/Blueprint';
import { importifyPartData } from './part';

export const VanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const BlueprintData: Blueprint = {
  ...VanillaBlueprintData,

  meta: {
    format_version: 1,
  },

  parts: new Map(),
};

export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
): Blueprint => {
  return { ...BlueprintData, ...blueprint };
};

export const blueprintToLatestVersion = (blueprint: Blueprint): Blueprint =>
  blueprint;

export const importifyBlueprint = (blueprint: object): Blueprint => {
  const mergedBlueprint = mergeWithDefaultBlueprintGlobals(blueprint);
  const partDataUpdatedBlueprint = {
    ...mergedBlueprint,
    parts: importifyPartsData(mergedBlueprint.parts, []),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

export const savifyBlueprint = (blueprint: Blueprint) => cloneDeep(blueprint);

export const importifyPartsData = (
  parts: AnyVanillaPart[] | AnyPartMap,
  parentAddress: PartAddress,
) => {
  if (isMap(parts)) {
    let newParts = cloneDeep(parts);

    newParts.forEach((part, address) => {
      if (part.n === 'Group') {
        newParts.set(
          address,
          merge(
            importifyPartData(part, parentAddress),
            {
              parts: importifyPartsData(part.parts, [
                ...parentAddress,
                address,
              ]),
            },
            { meta: { address: [...parentAddress, address] } },
          ),
        );
      } else {
        newParts.set(address, importifyPartData(part, parentAddress));
      }
    });

    return newParts;
  } else {
    const newParts = new Map(
      parts.map((part) => [UUIDV4(), importifyPartData(part, parentAddress)]),
    );

    return newParts;
  }
};

export const newBlueprint = (blueprint = {}) => {
  blueprintStore.setState(
    merge(importifyBlueprint(cloneDeep(blueprint)), BlueprintData),
  );
};

export const deletePartsBySelection = () => {
  const selections = selectionStore.getState().selections;

  blueprintStore.setState(
    produce((draft: Blueprint) => {
      selections.forEach((selection) => {
        const index = selection[selection.length - 1];
        let parentAddress = selection.splice(0, selection.length - 1);
        let parent: Group | Blueprint =
          (getPartByAddress(parentAddress, draft) as Group) ?? draft;

        parent.parts.delete(index);
      });
    }),
  );

  selectionStore.setState({ selections: [] });
};

export const getPartByAddress = (address: PartAddress, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  let currentPart = blueprintState.parts.get(address[0]);

  address.forEach((route, index) => {
    if (index === 0) {
      return;
    } else {
      currentPart = (currentPart as Group).parts.get(route);
    }
  });

  return currentPart;
};

export const setPartByAddress = (
  address: PartAddress,
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => setPartsByAddresses([address], newState, state);

export const setPartsByAddresses = (
  addresses: PartAddress[],
  newState: DeepPartial<AnyPart>,
  state?: Blueprint,
) => {
  if (state) {
    addresses.forEach((address) => {
      let part = getPartByAddress(address, state);
      merge(part, newState);
    });
  } else {
    blueprintStore.setState(
      produce((draft: Blueprint) => {
        setPartsByAddresses(addresses, newState, draft);
      }),
    );
  }
};

export const getReactivePartByAddress = (address: PartAddress) => {
  return blueprintStore((state) => getPartByAddress(address, state));
};
