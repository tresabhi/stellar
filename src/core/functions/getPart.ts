import { AnyPartName, PartModule } from 'core/parts/Root';
import FuelTankPart from 'core/parts/FuelTank';
import GroupPart from 'core/parts/Group';

const NAMED_PART_MODULES: Record<AnyPartName, PartModule> = {
  'Fuel Tank': FuelTankPart,
  Group: GroupPart,
};

export default function getPart(partName: AnyPartName) {
  const module = NAMED_PART_MODULES[partName];

  const hook = {
    ...module,

    isStellarOnly: module.VANILLA_DATA === undefined,
  };

  return hook;
}
