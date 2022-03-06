import * as Partition from 'components/Partitions';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import { getPartByID } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import blueprintStore from 'stores/blueprint';
import settingsStore, { SettingsStore } from 'stores/settings';
import { AnyPartName, PartIDs } from 'types/Parts';
import compareIDArrays from 'utilities/compareIDArrays';
import TransformationProperties from './components/TransformationProperties';
import styles from './index.module.scss';

const RightSideBar = () => {
  const partition = settingsStore(
    (state) => state.layout.rightSideBar.partition,
  );
  const selections = blueprintStore(
    (state) => state.selections.current,
    compareIDArrays,
  );
  const selectionsLength = blueprintStore(
    (state) => state.selections.current.length,
  );
  const isPartitionProperties = partition === 'properties';
  const isPartitionInspect = partition === 'inspect';

  const handlePropertiesClick = () =>
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.layout.rightSideBar.partition = 'properties';
      }),
    );
  const handleInspectClick = () =>
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.layout.rightSideBar.partition = 'inspect';
      }),
    );

  let selectionsByPartNames: Map<AnyPartName, PartIDs> = new Map();
  selections.forEach((selection) => {
    const part = getPartByID(selection);

    if (part) {
      if (selectionsByPartNames.has(part.n)) {
        selectionsByPartNames.get(part.n)?.push(selection);
      } else {
        selectionsByPartNames.set(part.n, [selection]);
      }
    }
  });
  let partsWithTransformations: PartIDs = [];
  let selectedPartNames: AnyPartName[] = Array.from(
    selectionsByPartNames.keys(),
  ).sort();
  let propertyItems: JSX.Element[] = [];
  selectedPartNames.forEach((partName) => {
    const partModule = getPartModule(partName);
    const IDs = selectionsByPartNames.get(partName)!;

    if (partModule?.hasTransformations) {
      partsWithTransformations.push(...IDs);
    }

    if (partModule?.PropertyComponent) {
      propertyItems.push(
        <partModule.PropertyComponent key={`type-${partName}`} IDs={IDs} />,
      );
    }
  });

  // TODO: clean up this mess lmao

  if (partsWithTransformations.length > 0) {
    propertyItems.unshift(
      <TransformationProperties
        key="type-transformations"
        IDs={partsWithTransformations}
      />,
    );
  }

  return (
    <SideBar.Container className={styles['right-side-bar']} width="minor">
      <Partition.Container>
        <Partition.Option
          selected={isPartitionProperties}
          onClick={handlePropertiesClick}
        >
          Properties
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={isPartitionInspect}
          onClick={handleInspectClick}
        >
          Inspect
        </Partition.Option>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display: isPartitionProperties ? undefined : 'none',
        }}
      >
        <PropertiesExplorer.Container>
          {selectionsLength > 0 ? (
            propertyItems
          ) : (
            <PropertiesExplorer.Group>
              <PropertiesExplorer.Title>
                Nothing Selected
              </PropertiesExplorer.Title>
            </PropertiesExplorer.Group>
          )}
        </PropertiesExplorer.Container>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display: isPartitionInspect ? undefined : 'none',
        }}
      >
        <span
          style={{
            color: 'white',
            display: 'block',
            padding: 'auto',
            paddingTop: '16px',
            textAlign: 'center',
          }}
        >
          Inspect coming soon!
        </span>
      </SideBar.Scrollable>
    </SideBar.Container>
  );
};
export default RightSideBar;
