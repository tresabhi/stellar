import * as Partition from 'components/Partitions';
import * as PartsExplorer from 'components/PartsExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import appStore, { AppStore } from 'stores/app';
import blueprintStore from 'stores/blueprint';

export default function LeftSideBar() {
  const partition = appStore((state) => state.layout.leftSideBar.partition);
  const isPartitionParts = partition === 'parts';
  const isPartitionSnippets = partition === 'snippets';
  const parts = blueprintStore((state) => state.parts);

  const partListings = Array.from(parts, ([id]) => {
    <PartsExplorer.Listing key={`part-${id}`} address={[id]} indentation={0} />;
  });

  const handlePartsClick = () =>
    appStore.setState(
      produce((draft: AppStore) => {
        draft.layout.leftSideBar.partition = 'parts';
      }),
    );
  const handleSnippetsClick = () =>
    appStore.setState(
      produce((draft: AppStore) => {
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
        <PartsExplorer.Container>{partListings}</PartsExplorer.Container>
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
