import { cloneDeep, merge } from 'lodash';
import DefaultPart from 'parts/Default';
import FuelTank from 'parts/FuelTank';
import Group from 'parts/Group';
import { PartAddress } from 'types/Blueprint';
import { AnyPart, AnyPartName, AnyVanillaPart, PartModule } from 'types/Parts';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTank,
  Group: Group,
};

export const importifyPartData = (
  partData: AnyVanillaPart | AnyPart,
  partAddress: PartAddress,
): AnyPart => {
  const plainPartData = getPartModule(partData.n)?.data ?? DefaultPart.data;

  let importifiedPartData = merge(cloneDeep(plainPartData), partData);

  return importifiedPartData;
};

// export const savifyPartData = (partData: AnyPartType, clone = true) => {};

export function getPartModule<D extends boolean>(
  partName: string,
  useDefault?: D,
): D extends true ? PartModule : PartModule | undefined {
  const module: PartModule | undefined = (NAMED_PART_MODULES as any)[partName];

  if (useDefault) {
    return module ?? DefaultPart;
  } else return module!;
}
