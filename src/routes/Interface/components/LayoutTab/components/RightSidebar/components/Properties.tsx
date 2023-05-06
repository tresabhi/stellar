import * as PropertiesPrimitive from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import getPart from 'core/part/getPart';
import { coneData } from 'game/parts/Cone';
import { coneSideData } from 'game/parts/ConeSide';
import { dockingPortData, DockingPortProperties } from 'game/parts/DockingPort';
import { fuelTankData, FuelTankProperties } from 'game/parts/FuelTank';
import { heatShieldData, HeatShieldProperties } from 'game/parts/HeatShield';
import { landingLegData } from 'game/parts/LandingLeg';
import { parachuteData } from 'game/parts/Parachute';
import { Part } from 'game/parts/Part';
import { PartWithConeProperties } from 'game/parts/PartWithCone';
import {
  PartWithEngine,
  PartWithEngineProperties,
} from 'game/parts/PartWithEngine';
import {
  PartWithFairing,
  PartWithFairingProperties,
} from 'game/parts/PartWithFairing';
import {
  PartWithFragment,
  PartWithFragmentProperties,
} from 'game/parts/PartWithFragment';
import { PartWithLandingLegProperties } from 'game/parts/PartWithLandingLeg';
import { PartWithParachuteProperties } from 'game/parts/PartWithParachute';
import { PartWithStrutProperties } from 'game/parts/PartWithStrut';
import {
  PartWithTexture,
  PartWithTextureProperties,
} from 'game/parts/PartWithTexture';
import {
  PartWithTransformations,
  PartWithTransformationsProperties,
} from 'game/parts/PartWithTransformations';
import {
  referenceImageData,
  ReferenceImageProperties,
} from 'game/parts/ReferenceImage';
import { strutData } from 'game/parts/Strut';
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
  partWithTransformations: {
    test: testProperties<Part & PartWithTransformations>(({ p, o }) => [p, o]),
    Component: PartWithTransformationsProperties,
  },
  partWithEngine: {
    test: testProperties<Part & PartWithEngine>(({ B }) => [B]),
    Component: PartWithEngineProperties,
  },
  partWithParachute: {
    test: testName(parachuteData.n),
    Component: PartWithParachuteProperties,
  },
  partWithLandingLeg: {
    test: testName(landingLegData.n),
    Component: PartWithLandingLegProperties,
  },
  partWithFragment: {
    test: testProperties<Part & PartWithFragment>(({ T }) => [T, T?.fragment]),
    Component: PartWithFragmentProperties,
  },
  partWithTexture: {
    test: testProperties<Part & PartWithTexture>(({ T }) => [
      T,
      T?.color_tex,
      T?.shape_tex,
    ]),
    Component: PartWithTextureProperties,
  },
  partWithCone: {
    test: testName([coneData.n, coneSideData.n]),
    Component: PartWithConeProperties,
  },
  fuelTank: {
    test: testName(fuelTankData.n),
    Component: FuelTankProperties,
  },
  referenceImage: {
    test: testName(referenceImageData.n),
    Component: ReferenceImageProperties,
  },
  heatShield: {
    test: testName(heatShieldData.n),
    Component: HeatShieldProperties,
  },
  dockingPort: {
    test: testName(dockingPortData.n),
    Component: DockingPortProperties,
  },
  fairing: {
    test: testProperties<Part & PartWithFairing>(({ B }) => [
      B,
      B?.adapt_to_tank,
      B?.detach_edge,
    ]),
    Component: PartWithFairingProperties,
  },
  strut: {
    test: testName(strutData.n),
    Component: PartWithStrutProperties,
  },
};

export default function Properties() {
  const { t } = useTranslator();
  const hasNoSelections = useBlueprint(
    (state) => state.part_selections.length === 0,
  );
  const selections = useBlueprint((state) => state.part_selections);
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
      <Sidebar.MessageRoot>
        <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_selection`}</Sidebar.Message>
        <Sidebar.Message subMessage>
          {t`tabs.layout.right_sidebar.properties.no_selection.instructions`}
        </Sidebar.Message>
      </Sidebar.MessageRoot>
    );
  }
  if (children.length > 0) {
    return <PropertiesPrimitive.Root>{children}</PropertiesPrimitive.Root>;
  }
  return (
    <Sidebar.MessageRoot>
      <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_properties`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.right_sidebar.properties.no_properties.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageRoot>
  );
}
