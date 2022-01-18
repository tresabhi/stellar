import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import appStore, { AppType } from 'core/stores/app';
import blueprintStore from 'core/stores/blueprint';
import * as PartsExplorer from 'components/PartsExplorer';
import produce from 'immer';

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
              produce((state: AppType) => {
                state.layout.leftSideBar.partition = 'parts';
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
              produce((state: AppType) => {
                state.layout.leftSideBar.partition = 'snippets';
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
