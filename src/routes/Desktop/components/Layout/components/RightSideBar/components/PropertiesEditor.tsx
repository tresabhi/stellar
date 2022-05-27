import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { mutateBlueprint } from 'core/blueprint';
import { getPart, getPartRegistry } from 'core/part';
import useBlueprint from 'hooks/useBlueprint';
import useUnitInputController from 'hooks/useUnitInputController';
import { useRef } from 'react';
import { AnyPart } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';
import TransformationProperties from './TransformationProperties';

const PropertiesEditor = () => {
  const initialBlueprintState = useBlueprint.getState();
  const selectionsLength = useBlueprint((state) => state.selections.length);
  const sortedSelections: Map<string, string[]> = new Map();
  const propertyItems: JSX.Element[] = [];
  const orderedSelections: string[] = [];
  let partsWithTransformations: string[] = [];
  const centerInputRef = useRef<HTMLInputElement>(null);
  const offsetXInputRef = useRef<HTMLInputElement>(null);
  const offsetYInputRef = useRef<HTMLInputElement>(null);
  const selections = useBlueprint(
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
    const ids = sortedSelections.get(partName)!;
    const PropertyComponent = getPartRegistry(partName)?.propertyComponent;

    if (PropertyComponent) {
      propertyItems.push(
        <PropertyComponent key={`property-${partName}`} ids={ids} />,
      );
    }
  });

  if (partsWithTransformations.length > 0) {
    propertyItems.unshift(
      <TransformationProperties
        key="type-transformations"
        ids={partsWithTransformations}
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
            <PropertiesExplorer.Input ref={centerInputRef} label="Center" />
            <PropertiesExplorer.Input ref={offsetXInputRef} label="Offset X" />
            <PropertiesExplorer.Input ref={offsetYInputRef} label="Offset Y" />
          </PropertiesExplorer.Row>
        </PropertiesExplorer.Group>
      )}
    </PropertiesExplorer.Container>
  );
};
export default PropertiesEditor;
