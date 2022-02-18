import produce from 'immer';
import * as PartsAPI from 'interfaces/part';
import { cloneDeep, merge } from 'lodash';
import { Group } from 'parts/Group';
import blueprintStore from 'stores/blueprint';
import selectionStore from 'stores/selection';
import DeepPartial from 'types/DeepPartial';
import { AnyPart, AnyVanillaPart } from 'types/Parts';
import { Blueprint, PartAddress, VanillaBlueprint } from '../types/Blueprint';

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
  parts: AnyVanillaPart[] | AnyPart[],
  parentAddress: PartAddress,
): AnyPart[] =>
  parts.map((part, index) => {
    const currentPartAddress = [...parentAddress, index];

    if (part.n === 'Group') {
      return {
        ...PartsAPI.importifyPartData(part, currentPartAddress),
        parts: importifyPartsData(part.parts, currentPartAddress),
      };
    } else {
      return PartsAPI.importifyPartData(part, currentPartAddress);
    }
  });

export const newBlueprint = (blueprint = {}) => {
  blueprintStore.setState(
    merge(importifyBlueprint(cloneDeep(blueprint)), BlueprintData),
  );
};

export const deletePartsBySelection = () => {
  const selections = selectionStore.getState().selections;

  selections.forEach((selection) => {});

  selectionStore.setState({ selections: [] });
};

export const getPartByAddress = (address: PartAddress, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  let currentPart: AnyPart = blueprintState.parts[address[0]];

  address.forEach((route, index) => {
    if (index === 0) {
      return;
    } else {
      currentPart = (currentPart as Group).parts[route];
    }
  });

  return currentPart;
};

export const setPartByAddress = (
  address: PartAddress,
  data: DeepPartial<AnyPart>,
  state?: Blueprint,
) => setPartsByAddresses([address], data, state);

export const setPartsByAddresses = (
  addresses: PartAddress[],
  data: DeepPartial<AnyPart>,
  state?: Blueprint,
) => {
  if (state) {
    addresses.forEach((address) => {
      let part = getPartByAddress(address, state);
      merge(part, data);
    });
  } else {
    blueprintStore.setState(
      produce((draft: Blueprint) => {
        setPartsByAddresses(addresses, data, draft);
      }),
    );
  }
};

export const getReactivePartByAddress = (address: PartAddress) => {
  return blueprintStore((state) => getPartByAddress(address, state));
};
