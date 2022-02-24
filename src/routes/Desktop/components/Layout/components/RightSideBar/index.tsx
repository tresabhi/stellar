import * as Partition from 'components/Partitions';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import { getPartByAddress } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import appStore, { AppStore } from 'stores/app';
import selectionStore from 'stores/selection';
import { PartAddress } from 'types/Blueprint';
import { AnyPartName } from 'types/Parts';
import TransformationProperties from './components/TransformationProperties';
import styles from './index.module.scss';

const RightSideBar = () => {
  const partition = appStore((state) => state.layout.rightSideBar.partition);
  const selections = selectionStore((state) => state.selections);
  const selectionsLength = selectionStore((state) => state.selections.length);
  const isPartitionProperties = partition === 'properties';
  const isPartitionInspect = partition === 'inspect';

  const handlePropertiesClick = () =>
    appStore.setState(
      produce((draft: AppStore) => {
        draft.layout.rightSideBar.partition = 'properties';
      }),
    );
  const handleInspectClick = () =>
    appStore.setState(
      produce((draft: AppStore) => {
        draft.layout.rightSideBar.partition = 'inspect';
      }),
    );

  let selectionsByPartNames: Map<AnyPartName, PartAddress[]> = new Map();
  selections.forEach((selection) => {
    const part = getPartByAddress(selection);

    if (part) {
      if (selectionsByPartNames.has(part.n)) {
        selectionsByPartNames.get(part.n)?.push(selection);
      } else {
        selectionsByPartNames.set(part.n, [selection]);
      }
    }
  });
  let partsWithTransformations: PartAddress[] = [];
  let selectedPartNames: AnyPartName[] = Array.from(
    selectionsByPartNames.keys(),
  ).sort();
  let propertyItems: JSX.Element[] = [];
  selectedPartNames.forEach((partName) => {
    const partModule = getPartModule(partName);
    const addresses = selectionsByPartNames.get(partName)!;

    if (partModule?.hasTransformations) {
      partsWithTransformations.push(...addresses);
    }

    if (partModule?.PropertyComponent) {
      propertyItems.push(
        <partModule.PropertyComponent
          key={`type-${partName}`}
          addresses={addresses}
        />,
      );
    }
  });

  // TODO: clean up this mess lmao

  if (partsWithTransformations.length > 0) {
    propertyItems.unshift(
      <TransformationProperties
        key="type-transformations"
        addresses={partsWithTransformations}
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
