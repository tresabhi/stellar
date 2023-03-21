import { Part } from 'game/parts/Part';
import { FC } from 'react';
import { testName } from 'routes/Interface/components/LayoutTab/components/RightSidebar/components/Properties';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import FuelTankControls from './components/FuelTankControls';

export interface EditControlsProps {
  id: string;
}

interface GroupedControls {
  test: (part: Part) => boolean;
  Component: FC<EditControlsProps>;
}

const groupedControls: Record<string, GroupedControls> = {
  fuelTank: {
    test: testName('Fuel Tank'),
    Component: FuelTankControls,
  },
};

export default function EditControls() {
  const tool = useApp((state) => state.editor.tool);
  const blueprint = useBlueprint.getState();

  if (tool !== Tool.Edit || blueprint.selections.length !== 1) return null;

  const id = blueprint.selections[0];
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
