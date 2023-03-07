import * as PropertiesPrimitive from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import getPart from 'core/part/getPart';
import { DockingPort, DockingPortProperties } from 'game/parts/DockingPort';
import { FuelTank, FuelTankProperties } from 'game/parts/FuelTank';
import { HeatShield, HeatShieldProperties } from 'game/parts/HeatShield';
import { Part } from 'game/parts/Part';
import {
  PartWithEngine,
  PartWithEngineProperties,
} from 'game/parts/PartWithEngine';
import {
  PartWithParachute,
  PartWithParachuteProperties,
} from 'game/parts/PartWithParachute';
import {
  PartWithTransformations,
  PartWithTransformationsProperties,
} from 'game/parts/PartWithTransformations';
import {
  ReferenceImage,
  ReferenceImageProperties,
} from 'game/parts/ReferenceImage';
import useTranslator from 'hooks/useTranslator';
import { FC } from 'react';
import useBlueprint from 'stores/blueprint';
import { PartPropertyComponentProps } from 'types/Parts';

interface GroupedProperties {
  test: (part: Part) => boolean;
  Component: FC<PartPropertyComponentProps>;
}

// TODO: sort these out
// BIG TODO: CREATE A HELPER FUNCTION FOR THIS
const groupedProperties: Record<string, GroupedProperties> = {
  transformations: {
    test: (part) =>
      (part as PartWithTransformations).p !== undefined &&
      (part as PartWithTransformations).o !== undefined,
    Component: PartWithTransformationsProperties,
  },
  engine: {
    test: (part) => (part as PartWithEngine).B !== undefined,
    Component: PartWithEngineProperties,
  },
  parachute: {
    test: (part) =>
      (part as PartWithParachute).N !== undefined &&
      (part as PartWithParachute).N.deploy_state !== undefined &&
      (part as PartWithParachute).N.animation_state !== undefined,
    Component: PartWithParachuteProperties,
  },
  fuelTank: {
    test: (part) => (part as FuelTank).n === 'Fuel Tank',
    Component: FuelTankProperties,
  },
  referenceImage: {
    test: (part) => (part as ReferenceImage).n === 'Reference Image',
    Component: ReferenceImageProperties,
  },
  heatShield: {
    test: (part) => (part as HeatShield).n === 'Heat Shield',
    Component: HeatShieldProperties,
  },
  dockingPort: {
    test: (part) => (part as DockingPort).n === 'Docking Port',
    Component: DockingPortProperties,
  },
};

export default function Properties() {
  const { t } = useTranslator();
  const hasNoSelections = useBlueprint(
    (state) => state.selections.length === 0,
  );
  const selections = useBlueprint((state) => state.selections);
  const typeSortedParts: Record<string, string[]> = {};
  const children: JSX.Element[] = [];

  Object.keys(groupedProperties).forEach((groupedPropertyId) => {
    const { test } = groupedProperties[groupedPropertyId];

    selections.forEach((selection) => {
      const part = getPart(selection);

      if (test(part)) {
        if (typeSortedParts[groupedPropertyId]) {
          typeSortedParts[groupedPropertyId].push(selection);
        } else {
          typeSortedParts[groupedPropertyId] = [selection];
        }
      }
    });
  });

  Object.keys(typeSortedParts).forEach((index) => {
    const ids = typeSortedParts[index];
    const { Component } = groupedProperties[index];

    children.push(
      <Component ids={ids} key={`type-sorted-properties-explorer-${index}`} />,
    );
  });

  if (hasNoSelections) {
    return (
      <Sidebar.MessageContainer>
        <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_selection`}</Sidebar.Message>
        <Sidebar.Message subMessage>
          {t`tabs.layout.right_sidebar.properties.no_selection.instructions`}
        </Sidebar.Message>
      </Sidebar.MessageContainer>
    );
  }
  if (children.length > 0) {
    return <PropertiesPrimitive.Root>{children}</PropertiesPrimitive.Root>;
  }
  return (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_properties`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.right_sidebar.properties.no_properties.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
}
