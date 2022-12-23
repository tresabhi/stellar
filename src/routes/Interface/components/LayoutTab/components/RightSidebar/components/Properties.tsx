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
import useTranslator from 'hooks/useTranslator';
import { FC } from 'react';
import useBlueprint from 'stores/blueprint';
import { PartPropertyComponentProps } from 'types/Parts';

interface GroupedProperties {
  test: (part: Part) => boolean;
  Component: FC<PartPropertyComponentProps>;
}

const groupedProperties: Record<string, GroupedProperties> = {
  transformations: {
    test: (part) => (part as PartWithTransformations).p !== undefined
      && (part as PartWithTransformations).o !== undefined,
    Component: PartWithTransformationsPropertyComponent,
  },
  engine: {
    test: (part) => (part as PartWithEngine).B !== undefined,
    Component: PartWithEnginePropertyComponent,
  },
};

export default function Properties() {
  const { t } = useTranslator();
  const hasNoSelections = useBlueprint(
    (state) => state.selections.length === 0,
  );
  const selections = useBlueprint((state) => state.selections);
  const typeSortedParts: Record<string, string[]> = {};
  const nameSortedParts: Record<string, string[]> = {};
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

  selections.forEach((selection) => {
    const part = getPart(selection);

    if (nameSortedParts[part.n]) {
      nameSortedParts[part.n].push(selection);
    } else {
      nameSortedParts[part.n] = [selection];
    }
  });

  Object.keys(typeSortedParts).forEach((index) => {
    const ids = typeSortedParts[index];
    const { Component } = groupedProperties[index];

    children.push(
      <Component ids={ids} key={`type-sorted-properties-explorer-${index}`} />,
    );
  });

  Object.keys(nameSortedParts).forEach((name) => {
    const ids = nameSortedParts[name];
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
