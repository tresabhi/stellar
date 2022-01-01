import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import appState from 'core/stores/appState';
import blueprintState from 'core/stores/blueprintState';
import * as PartsExplorer from 'components/PartsExplorer';

export default function Explorer() {
  return (
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={appState((state) => state.layout.leftSideBar) === 'parts'}
          onClick={() =>
            appState.setState((state) => ({
              layout: { ...state.layout, leftSideBar: 'parts' },
            }))
          }
        >
          Parts
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={
            appState((state) => state.layout.leftSideBar) === 'snippets'
          }
          onClick={() =>
            appState.setState((state) => ({
              layout: { ...state.layout, leftSideBar: 'snippets' },
            }))
          }
        >
          Snippets
        </Partition.Option>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display:
            appState((state) => state.layout.leftSideBar) === 'parts'
              ? 'unset'
              : 'none',
        }}
      >
        <PartsExplorer.Container>
          {blueprintState((state) => state.parts).map((part) => (
            <PartsExplorer.Listing data={part} />
          ))}
        </PartsExplorer.Container>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display:
            appState((state) => state.layout.leftSideBar) === 'snippets'
              ? 'unset'
              : 'none',
        }}
      >
        Snippets coming soon!
      </SideBar.Scrollable>
    </SideBar.Container>
  );
}
