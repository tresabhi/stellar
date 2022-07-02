import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { mutateBlueprint } from 'core/blueprint';
import { getPart, getPartRegistry } from 'core/part';
import { PartWithTransformationsPropertyComponent } from 'game/parts/PartWithTransformations';
import useBlueprint from 'hooks/useBlueprint';
import useTranslator from 'hooks/useTranslator';
import useUnitInputController from 'hooks/useUnitInputController';
import { FC, useRef } from 'react';
import { AnyPart, PartPropertyComponentProps } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';

export const partGroupPropertyComponents = new Map<
  string,
  FC<PartPropertyComponentProps>
>([
  ['PartWithTransformations', PartWithTransformationsPropertyComponent],
  // ['PartWithEngine', PartWithEnginePropertyComponent],
]);

const PropertiesEditor = () => {
  const { t } = useTranslator();
  const initialBlueprintState = useBlueprint.getState();
  const selectionsLength = useBlueprint((state) => state.selections.length);
  const sortedSelections: Map<string, string[]> = new Map();
  const propertyItems: JSX.Element[] = [];
  const orderedSelections: string[] = [];
  const centerInputRef = useRef<HTMLInputElement>(null);
  const offsetXInputRef = useRef<HTMLInputElement>(null);
  const offsetYInputRef = useRef<HTMLInputElement>(null);
  const selections = useBlueprint(
    (state) => state.selections,
    compareStringArrays,
  );
  const partGroups = new Map<string, string[]>([
    ['PartWithTransformations', []],
    ['PartWithEngine', []],
  ]);

  // sort selections by class name and look for common properties
  selections.forEach((selection) => {
    const part = getPart<AnyPart>(selection);

    if (part) {
      if (part.p && part.o && part.o.z) {
        partGroups.get('PartWithTransformations')?.push(selection);
      }
      if (part.B) {
        partGroups.get('PartWithEngine')?.push(selection);
      }

      if (sortedSelections.has(part.n)) {
        sortedSelections.get(part.n)!.push(selection);
      } else {
        sortedSelections.set(part.n, [selection]);
        orderedSelections.push(part.n);
      }
    }
  });

  // if (partsWithTransformations.length > 0) {
  //   propertyItems.unshift(
  //     <PartWithTransformationsPropertyComponent
  //       key="type-transformations"
  //       ids={partsWithTransformations}
  //     />,
  //   );
  // }
  partGroups.forEach((ids, type) => {
    const PropertyComponent = partGroupPropertyComponents.get(type);

    if (PropertyComponent) {
      propertyItems.push(
        <PropertyComponent ids={ids} key={`property-component-${type}`} />,
      );
    }
  });

  // alphabetize selections
  orderedSelections.sort();

  orderedSelections.forEach((partName) => {
    const ids = sortedSelections.get(partName)!;
    const PropertyComponent = getPartRegistry(partName)?.propertyComponent;

    if (PropertyComponent) {
      propertyItems.push(
        <PropertyComponent key={`property-${partName}`} ids={ids} />,
      );
    }
  });

  useUnitInputController(centerInputRef, initialBlueprintState.center, {
    onChange: (value) => {
      mutateBlueprint((draft) => {
        draft.center = value;
      });
    },
    focusOnParentClick: true,
    suffix: 'm',
  });
  useUnitInputController(offsetXInputRef, initialBlueprintState.offset.x, {
    onChange: (value) => {
      mutateBlueprint((draft) => {
        draft.offset.x = value;
      });
    },
    focusOnParentClick: true,
    suffix: 'm',
  });
  useUnitInputController(offsetYInputRef, initialBlueprintState.offset.y, {
    onChange: (value) => {
      mutateBlueprint((draft) => {
        draft.offset.y = value;
      });
    },
    focusOnParentClick: true,
    suffix: 'm',
  });

  return (
    <PropertiesExplorer.Container>
      {selectionsLength > 0 ? (
        propertyItems
      ) : (
        <PropertiesExplorer.Group>
          <PropertiesExplorer.Title>{t`properties_explorer.properties.canvas`}</PropertiesExplorer.Title>
          <PropertiesExplorer.Row>
            <PropertiesExplorer.Input
              ref={centerInputRef}
              label={t`properties_explorer.properties.canvas.center`}
            />
            <PropertiesExplorer.Input
              ref={offsetXInputRef}
              label={t`properties_explorer.properties.canvas.offset_x`}
            />
            <PropertiesExplorer.Input
              ref={offsetYInputRef}
              label={t`properties_explorer.properties.canvas.offset_y`}
            />
          </PropertiesExplorer.Row>
        </PropertiesExplorer.Group>
      )}
    </PropertiesExplorer.Container>
  );
};
export default PropertiesEditor;
