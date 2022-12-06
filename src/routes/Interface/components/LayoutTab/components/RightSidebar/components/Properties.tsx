import * as PropertiesPrimitive from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import { getPart, getPartRegistry } from 'core/part';
import { Part } from 'game/parts/Part';
import {
  PartWithEngine,
  PartWithEnginePropertyComponent,
} from 'game/parts/PartWithEngine';
import {
  PartWithTransformations,
  PartWithTransformationsPropertyComponent,
} from 'game/parts/PartWithTransformations';
import { useTranslator } from 'hooks/useTranslator';
import { FC } from 'react';
import useBlueprint from 'stores/blueprint';
import { PartPropertyComponentProps } from 'types/Parts';

interface GroupedProperties {
  test: (part: Part) => boolean;
  Component: FC<PartPropertyComponentProps>;
}

const groupedProperties: GroupedProperties[] = [
  {
    test: (part) =>
      (part as PartWithTransformations).p !== undefined &&
      (part as PartWithTransformations).o !== undefined,
    Component: PartWithTransformationsPropertyComponent,
  },
  {
    test: (part) => (part as PartWithEngine).B !== undefined,
    Component: PartWithEnginePropertyComponent,
  },
];

export const Properties = () => {
  const { t } = useTranslator();
  const hasNoSelections = useBlueprint(
    (state) => state.selections.length === 0,
  );
  const selections = useBlueprint((state) => state.selections);
  const typeSortedParts = new Map<number, string[]>();
  const nameSortedParts = new Map<string, string[]>();
  const children: JSX.Element[] = [];

  groupedProperties.forEach(({ test }, index) => {
    selections.forEach((selection) => {
      const part = getPart(selection);

      if (test(part)) {
        if (typeSortedParts.has(index)) {
          typeSortedParts.get(index)?.push(selection);
        } else {
          typeSortedParts.set(index, [selection]);
        }
      }
    });
  });

  selections.forEach((selection) => {
    const part = getPart(selection);

    if (nameSortedParts.has(part.n)) {
      nameSortedParts.get(part.n)?.push(selection);
    } else {
      nameSortedParts.set(part.n, [selection]);
    }
  });

  typeSortedParts.forEach((ids, index) => {
    const { Component } = groupedProperties[index];

    children.push(
      <Component ids={ids} key={`type-sorted-properties-explorer-${index}`} />,
    );
  });

  nameSortedParts.forEach((ids, name) => {
    const partRegistry = getPartRegistry(name);

    if (partRegistry && partRegistry.PropertyEditor) {
      children.push(
        <partRegistry.PropertyEditor
          ids={ids}
          key={`properties-explorer-${name}`}
        />,
      );
    }
  });

  return hasNoSelections ? (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_selection`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.right_sidebar.properties.no_selection.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  ) : children.length > 0 ? (
    <PropertiesPrimitive.Container>{children}</PropertiesPrimitive.Container>
  ) : (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.right_sidebar.properties.no_properties`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.right_sidebar.properties.no_properties.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
};
