import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useUnitInputController from 'hooks/useUnitInputController';
import { getPart, mutateBlueprint } from 'interfaces/blueprint';
import { getPartPropertyComponent } from 'interfaces/part';
import { useRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { AnyPart, UUID } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';
import TransformationProperties from './TransformationProperties';

const PropertiesEditor = () => {
  const initialBlueprintState = blueprintStore.getState();
  const selectionsLength = blueprintStore((state) => state.selections.length);
  const sortedSelections: Map<string, UUID[]> = new Map();
  const propertyItems: JSX.Element[] = [];
  const orderedSelections: string[] = [];
  let partsWithTransformations: UUID[] = [];
  const centerInputRef = useRef<HTMLInputElement>(null);
  const offsetXInputRef = useRef<HTMLInputElement>(null);
  const offsetYInputRef = useRef<HTMLInputElement>(null);
  const selections = blueprintStore(
    (state) => state.selections,
    compareStringArrays,
  );

  // sort selections by class name and look for common properties
  selections.forEach((selection) => {
    const part = getPart<AnyPart>(selection);

    if (part) {
      if (part.p && part.o) partsWithTransformations.push(selection);

      if (sortedSelections.has(part.n)) {
        sortedSelections.get(part.n)!.push(selection);
      } else {
        sortedSelections.set(part.n, [selection]);
        orderedSelections.push(part.n);
      }
    }
  });

  // alphabetize selections
  orderedSelections.sort();

  orderedSelections.forEach((partName) => {
    const IDs = sortedSelections.get(partName)!;
    const PropertyComponent = getPartPropertyComponent(partName);

    if (PropertyComponent) {
      propertyItems.push(
        <PropertyComponent key={`property-${partName}`} IDs={IDs} />,
      );
    }
  });

  if (partsWithTransformations.length > 0) {
    propertyItems.unshift(
      <TransformationProperties
        key="type-transformations"
        IDs={partsWithTransformations}
      />,
    );
  }

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
          <PropertiesExplorer.Title>Canvas</PropertiesExplorer.Title>
          <PropertiesExplorer.Row>
            <PropertiesExplorer.NamedInput
              ref={centerInputRef}
              label="Center"
            />
            <PropertiesExplorer.NamedInput
              ref={offsetXInputRef}
              label="Offset X"
            />
            <PropertiesExplorer.NamedInput
              ref={offsetYInputRef}
              label="Offset Y"
            />
          </PropertiesExplorer.Row>
        </PropertiesExplorer.Group>
      )}
    </PropertiesExplorer.Container>
  );
};
export default PropertiesEditor;
