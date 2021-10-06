import * as FuelTank from './FuelTank';
import * as Root from './Root';
import { merge } from 'lodash';
import defaultBlueprint from '../../blueprints/default.json';

const partComponentNames = new Map([
  ['Root', 'Root'],
  ['Fuel Tank', 'FuelTank'],
]);

const components: any = {
  Root,
  FuelTank,
};

export const getComponentNameFromPartName = (partName: string): string =>
  partComponentNames.get(partName) ?? 'Root';

export const getComponentFromPartName = (partName: string) => {
  const componentName = getComponentNameFromPartName(partName);
  return components[componentName];
};

export const getMeshFromPartName = (partName: string, highPoly = true) => {
  const component = getComponentFromPartName(partName);
  const poly = highPoly ? 'HighPoly' : 'LowPoly';
  return component[poly];
};

export const getComponentDefaultDataFromComponentName = (partName: string) =>
  components[partName].defaultData;

export const updatePartDataWithPartName = (partData: Root.type) =>
  merge(partData, getComponentFromPartName(partData.n).defaultData);

export const mergeBlueprintGlobals = (blueprint: Object) =>
  merge(defaultBlueprint, blueprint);

/**
 *Nothing for now
 */
export const blueprintToLatestVersion = (blueprint: Object) => blueprint;

export const updatePartData = (partData: Root.type) => {
  const component = getComponentFromPartName(partData.n);
  return merge(component.defaultData, partData);
};

export const updatePartsData = (parts: Array<Root.type>) => {
  return parts.map((currentPart) => updatePartData(currentPart));
};

/**
 *Procedure
 *1. Merge whole blueprint with default data
 *2. Merge all parts their with default data
 *3. Use version updaters
 */
export const updateBlueprint = (blueprint: Object) => {
  blueprint = blueprintToLatestVersion(mergeBlueprintGlobals(blueprint));
};
