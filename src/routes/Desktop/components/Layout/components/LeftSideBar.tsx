import * as Partition from 'components/Partitions';
import * as PartsExplorer from 'components/PartsExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import settingsStore, { SettingsStore } from 'stores/settings';

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
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={isPartitionParts}
          onClick={handlePartsClick}
        >
          Parts
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={isPartitionSnippets}
          onClick={handleSnippetsClick}
        >
          Snippets
        </Partition.Option>
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
