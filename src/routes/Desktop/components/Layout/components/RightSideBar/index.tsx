import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import useSettings, { UseSettings } from 'hooks/useSettings';
import produce from 'immer';
import InspectViewer from './components/InspectViewer';
import PropertiesEditor from './components/PropertiesEditor';
import styles from './index.module.scss';

const RightSideBar = () => {
  const partition = useSettings((state) => state.layout.rightSideBar.partition);
  const isPartitionProperties = partition === 'properties';
  const isPartitionInspect = partition === 'inspect';

  const handlePropertiesClick = () =>
    useSettings.setState(
      produce((draft: UseSettings) => {
        draft.layout.rightSideBar.partition = 'properties';
      }),
    );
  const handleInspectClick = () =>
    useSettings.setState(
      produce((draft: UseSettings) => {
        draft.layout.rightSideBar.partition = 'inspect';
      }),
    );

  return (
    <SideBar.Container className={styles['right-side-bar']} width="minor">
      <Partition.Container>
        <Partition.Partition
          selected={isPartitionProperties}
          onClick={handlePropertiesClick}
        >
          Properties
        </Partition.Partition>
        <Partition.Separator />
        <Partition.Partition
          selected={isPartitionInspect}
          onClick={handleInspectClick}
        >
          Inspect
        </Partition.Partition>
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
