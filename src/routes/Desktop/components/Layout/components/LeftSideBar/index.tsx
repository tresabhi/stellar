import * as Partition from 'components/Partitions';
import * as PartsExplorer from 'components/PartsExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import settingsStore, { SettingsStore } from 'stores/settings';
import styles from './index.module.scss';

export default function LeftSideBar() {
  const partition = settingsStore(
    (state) => state.layout.leftSideBar.partition,
  );
  const isPartitionParts = partition === 'parts';
  const isPartitionSnippets = partition === 'snippets';

  const handlePartsClick = () =>
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.layout.leftSideBar.partition = 'parts';
      }),
    );
  const handleSnippetsClick = () =>
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.layout.leftSideBar.partition = 'snippets';
      }),
    );

  return (
    <SideBar.Container className={styles['left-side-bar']}>
      <Partition.Container>
        <Partition.Partition
          selected={isPartitionParts}
          onClick={handlePartsClick}
        >
          Parts
        </Partition.Partition>
        <Partition.Separator />
        <Partition.Partition
          selected={isPartitionSnippets}
          onClick={handleSnippetsClick}
        >
          Snippets
        </Partition.Partition>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display: isPartitionParts ? undefined : 'none',
        }}
      >
        <PartsExplorer.Container indentation={0} />
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display: isPartitionSnippets ? undefined : 'none',
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
          Snippets coming soon!
        </span>
      </SideBar.Scrollable>
    </SideBar.Container>
  );
}
