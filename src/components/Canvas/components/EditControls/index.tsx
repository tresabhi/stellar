import { baseSmallData } from 'game/parts/BaseSmall';
import { fuelTankData } from 'game/parts/FuelTank';
import { Part } from 'game/parts/Part';
import { FC } from 'react';
import { testName } from 'routes/Interface/components/LayoutTab/components/RightSidebar/components/Properties';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import BaseSmallControls from './components/BaseSmall';
import FuelTankControls from './components/FuelTankControls';

export interface EditControlsProps {
  id: string;
}

interface GroupedControls {
  test: (part: Part) => boolean;
  Component: FC<EditControlsProps>;
}

export const groupedControls: Record<string, GroupedControls> = {
  [fuelTankData.n]: {
    test: testName(fuelTankData.n),
    Component: FuelTankControls,
  },
  [baseSmallData.n]: {
    test: testName(baseSmallData.n),
    Component: BaseSmallControls,
  },
};

export default function EditControls() {
  const tool = useApp((state) => state.editor.tool);
  const blueprint = useBlueprint.getState();

  if (tool !== Tool.Edit || blueprint.part_selections.length !== 1) return null;

  const id = blueprint.part_selections[0];
  const part = blueprint.parts[id];
  let Controls: FC<EditControlsProps> | undefined;

  Object.keys(groupedControls).some((key) => {
    const groupedControl = groupedControls[key];
    const result = groupedControl.test(part);

    if (result) Controls = groupedControl.Component;
    return result;
  });

  return Controls ? <Controls id={id} /> : null;
}
