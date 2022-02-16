import * as Partition from 'components/Partitions';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import { getPartByAddress } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import appStore, { AppStore } from 'stores/app';
import selectionStore from 'stores/selection';
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

  const properties = selections.map((selection) => {
    const part = getPartByAddress(selection);
    const PropertyComponent = getPartModule(part.n)?.PropertyComponent;

    return PropertyComponent ? <PropertyComponent data={part} /> : undefined;
  });

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
            properties
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
