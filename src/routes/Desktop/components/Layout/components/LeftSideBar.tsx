import * as Partition from 'components/Partitions';
import * as PartsExplorer from 'components/PartsExplorer';
import * as SideBar from 'components/SideBar';
import produce from 'immer';
import appStore, { AppStore } from 'stores/app';
import blueprintStore from 'stores/blueprint';

export default function LeftSideBar() {
  const reactiveParts = blueprintStore((state) => state.parts);

  const PartListings = reactiveParts.map((part, index) => (
    <PartsExplorer.Listing
      key={`part-${index}`}
      address={[index]}
      indentation={0}
    />
  ));

  return (
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={
            appStore((state) => state.layout.leftSideBar.partition) === 'parts'
          }
          onClick={() =>
            appStore.setState(
              produce((draft: AppStore) => {
                draft.layout.leftSideBar.partition = 'parts';
              }),
            )
          }
        >
          Parts
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={
            appStore((state) => state.layout.leftSideBar.partition) ===
            'snippets'
          }
          onClick={() =>
            appStore.setState(
              produce((draft: AppStore) => {
                draft.layout.leftSideBar.partition = 'snippets';
              }),
            )
          }
        >
          Snippets
        </Partition.Option>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display:
            appStore((state) => state.layout.leftSideBar.partition) === 'parts'
              ? 'unset'
              : 'none',
        }}
      >
        <PartsExplorer.Container>{PartListings}</PartsExplorer.Container>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display:
            appStore((state) => state.layout.leftSideBar.partition) ===
            'snippets'
              ? 'unset'
              : 'none',
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
