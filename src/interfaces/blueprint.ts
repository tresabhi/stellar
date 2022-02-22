import produce from 'immer';
import { cloneDeep, merge } from 'lodash';
import { Group } from 'parts/Group';
import blueprintStore from 'stores/blueprint';
import selectionStore from 'stores/selection';
import DeepPartial from 'types/DeepPartial';
import { AnyPart } from 'types/Parts';
import { Blueprint, PartAddress, VanillaBlueprint } from '../types/Blueprint';
import { importifyPartsData } from './part';

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
        const partId = selection[selection.length - 1];
        const parentAddress = [...selection].splice(0, selection.length - 1);
        let parent: Group | Blueprint =
          (getPartByAddress(parentAddress, draft) as Group) ?? draft;

        parent.parts.delete(partId);
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
      currentPart = (currentPart as Group | undefined)?.parts?.get(route);
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
