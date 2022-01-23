import FuelTankPart from 'core/parts/FuelTank';
import GroupPart from 'core/parts/Group';
import RootPart, { AnyPartName, PartModule } from 'core/parts/Root';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTankPart,
  Group: GroupPart,
  Root: RootPart,
};

export default function getPart(partName: AnyPartName) {
  const module = NAMED_PART_MODULES[partName] || NAMED_PART_MODULES.Root;

  const hook = {
    ...module,

    isStellarOnly: module.VANILLA_DATA === undefined,
  };

  return hook;
}
