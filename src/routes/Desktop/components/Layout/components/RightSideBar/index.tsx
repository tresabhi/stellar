import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import settingsStore, { SettingsStore } from 'stores/settings';
import InspectViewer from './components/InspectViewer';
import PropertiesEditor from './components/PropertiesEditor';
import styles from './index.module.scss';

const RightSideBar = () => {
  const partition = settingsStore(
    (state) => state.layout.rightSideBar.partition,
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
        <PropertiesEditor />
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display: isPartitionInspect ? undefined : 'none',
        }}
      >
        <InspectViewer />
      </SideBar.Scrollable>
    </SideBar.Container>
  );
};
export default RightSideBar;
