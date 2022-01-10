import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import app, { AppType } from 'core/stores/app';
import blueprintStore from 'core/stores/blueprint';
import * as PartsExplorer from 'components/PartsExplorer';
import produce from 'immer';

export default function LeftSideBar() {
  const PartListings = blueprintStore((state) => state.parts).map(
    (part, index) => (
      <PartsExplorer.Listing
        key={`part-${index}`}
        address={[index]}
        indentation={0}
      />
    ),
  );

  return (
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={app((state) => state.layout.leftSideBar) === 'parts'}
          onClick={() =>
            app.setState(
              produce((state: AppType) => {
                state.layout.leftSideBar = 'parts';
              }),
            )
          }
        >
          Parts
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={app((state) => state.layout.leftSideBar) === 'snippets'}
          onClick={() =>
            app.setState(
              produce((state: AppType) => {
                state.layout.leftSideBar = 'snippets';
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
            app((state) => state.layout.leftSideBar) === 'parts'
              ? 'unset'
              : 'none',
        }}
      >
        <PartsExplorer.Container>{PartListings}</PartsExplorer.Container>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display:
            app((state) => state.layout.leftSideBar) === 'snippets'
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
