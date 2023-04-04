import * as PropertiesPrimitive from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import getPart from 'core/part/getPart';
import { DockingPortData, DockingPortProperties } from 'game/parts/DockingPort';
import { FuelTankData, FuelTankProperties } from 'game/parts/FuelTank';
import { HeatShieldData, HeatShieldProperties } from 'game/parts/HeatShield';
import { LandingLegData } from 'game/parts/LandingLeg';
import { ParachuteData } from 'game/parts/Parachute';
import { Part } from 'game/parts/Part';
import {
  PartWithCone,
  PartWithConeData,
  PartWithConeProperties,
} from 'game/parts/PartWithCone';
import {
  PartWithEngine,
  PartWithEngineData,
  PartWithEngineProperties,
} from 'game/parts/PartWithEngine';
import {
  PartWithFragment,
  PartWithFragmentData,
  PartWithFragmentProperties,
} from 'game/parts/PartWithFragment';
import {
  PartWithLandingLegData,
  PartWithLandingLegProperties,
} from 'game/parts/PartWithLandingLeg';
import {
  PartWithParachuteData,
  PartWithParachuteProperties,
} from 'game/parts/PartWithParachute';
import {
  PartWithTexture,
  PartWithTextureData,
  PartWithTextureProperties,
} from 'game/parts/PartWithTexture';
import {
  PartWithTransformations,
  PartWithTransformationsData,
  PartWithTransformationsProperties,
} from 'game/parts/PartWithTransformations';
import {
  ReferenceImageData,
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

export function testProperties<Type extends Part>(
  lister: (state: Partial<Type>) => (unknown | undefined)[],
) {
  return (state: Part) =>
    !lister(state as Type).some((item) => item === undefined);
}
export function testName(names: string | string[]) {
  return (state: Part) =>
    typeof names === 'string' ? names === state.n : names.includes(state.n);
}

const groupedProperties: Record<string, GroupedProperties> = {
  [PartWithTransformationsData.n]: {
    test: testProperties<PartWithTransformations>(({ p, o }) => [p, o]),
    Component: PartWithTransformationsProperties,
  },
  [PartWithEngineData.n]: {
    test: testProperties<PartWithEngine>(({ B }) => [B]),
    Component: PartWithEngineProperties,
  },
  [PartWithParachuteData.n]: {
    test: testName(ParachuteData.n),
    Component: PartWithParachuteProperties,
  },
  [PartWithLandingLegData.n]: {
    test: testName(LandingLegData.n),
    Component: PartWithLandingLegProperties,
  },
  [PartWithFragmentData.n]: {
    test: testProperties<PartWithFragment>(({ T }) => [T, T?.fragment]),
    Component: PartWithFragmentProperties,
  },
  [PartWithTextureData.n]: {
    test: testProperties<PartWithTexture>(({ T }) => [
      T,
      T?.color_tex,
      T?.shape_tex,
    ]),
    Component: PartWithTextureProperties,
  },
  [PartWithConeData.n]: {
    test: testProperties<PartWithCone>(({ N }) => [N, N?.size]),
    Component: PartWithConeProperties,
  },
  [FuelTankData.n]: {
    test: testName(FuelTankData.n),
    Component: FuelTankProperties,
  },
  [ReferenceImageData.n]: {
    test: testName(ReferenceImageData.n),
    Component: ReferenceImageProperties,
  },
  [HeatShieldData.n]: {
    test: testName(HeatShieldData.n),
    Component: HeatShieldProperties,
  },
  [DockingPortData.n]: {
    test: testName(DockingPortData.n),
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

  Object.keys(typeSortedParts).forEach((type) => {
    const ids = typeSortedParts[type];
    const { Component } = groupedProperties[type];

    children.push(
      <Component ids={ids} key={`type-sorted-properties-explorer-${type}`} />,
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
