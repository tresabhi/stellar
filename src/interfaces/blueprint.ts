import blueprintStore from 'stores/blueprint';
import partsEnumStore, { PartsEnumStore } from 'stores/partsEnum';
import selectionStore from 'stores/selection';
import { AnyPart, AnyVanillaPart } from 'types/Parts';
import * as PartsAPI from 'interfaces/part';
import { cloneDeep, merge } from 'lodash';
import { Group } from 'parts/Group';
import { v4 } from 'uuid';
import {
  Blueprint,
  PartAddress,
  VanillaBlueprint,
} from '../types/Blueprint';

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

/**
 * Merges the given blueprint into the default blueprint.
 */
export const mergeWithDefaultBlueprintGlobals = (
  blueprint: object,
): Blueprint => {
  return { ...BlueprintData, ...blueprint };
};

/**
 * Updates the given blueprint to compensate for changes in the format.
 */
export const blueprintToLatestVersion = (blueprint: Blueprint): Blueprint =>
  blueprint;

/**
 * Prepares the given blueprint for use in the editor.
 *
 * Procedure:
 * 1. Merge whole blueprint with default data
 * 2. Merge all parts their with default data
 * 3. Use version updaters
 */
export const importifyBlueprint = (blueprint: object): Blueprint => {
  const mergedBlueprint = mergeWithDefaultBlueprintGlobals(blueprint);
  const partDataUpdatedBlueprint = {
    ...mergedBlueprint,
    parts: importifyPartsData(mergedBlueprint.parts),
  };
  const latestVersionBlueprint = blueprintToLatestVersion(
    partDataUpdatedBlueprint,
  );

  return latestVersionBlueprint;
};

/**
 * Gets blueprint ready to save locally
 */
export const savifyBlueprint = (blueprint: Blueprint) => cloneDeep(blueprint);

/**
 * Prepares all parts for use in the editor.
 */
export const importifyPartsData = (
  parts: AnyVanillaPart[] | AnyPart[],
  parent?: Group,
): AnyPart[] => {
  const newPartEnum: PartsEnumStore = new Map();
  const newParts = parts.map((part) => {
    if (part.n === 'Group') {
      let newPart = {
        ...PartsAPI.importifyPartData(part, parent),
        parts: importifyPartsData(part.parts, part),
      };

      newPart.meta.ID = v4();
      newPart.meta.parentID = parent?.meta.ID;
      newPartEnum.set(newPart.meta.ID, newPart);

      return newPart;
    } else {
      return PartsAPI.importifyPartData(part, parent);
    }
  });

  partsEnumStore.setState(newPartEnum);
  return newParts;
};

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

export const getPartIndexByID = (
  ID: string,
  parent: Group,
): number | undefined => {
  let partIndex: number;

  parent.parts.some((part, index) => {
    if (part.meta.ID === ID) {
      partIndex = index;
      return true;
    }
  });

  return partIndex!;
};

export const getAddressByID = (ID: string) => {
  const partsEnumState = partsEnumStore.getState();
  let address: PartAddress = [];
  let currentPart: AnyPart = partsEnumState.get(ID)!;
  let currentParent: Group;

  while (currentPart.meta.parentID) {
    currentParent = partsEnumState.get(currentPart.meta.parentID)! as Group;
    address.unshift(currentParent.parts.indexOf(currentPart));

    currentParent = currentPart as Group;
  }

  return address;
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

export const getReactivePartByAddress = (address: PartAddress) => {
  return blueprintStore((state) => getPartByAddress(address, state));
};

export const getPartByID = 