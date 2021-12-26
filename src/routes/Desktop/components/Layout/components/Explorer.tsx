import * as Partition from 'components/Partition';
import * as SideBar from 'components/SideBar';
import appState from 'core/stores/appState';

export default function Explorer() {
  return (
    <SideBar.Container>
      <Partition.Container>
        <Partition.Option
          selected={appState((state) => state.layout.leftSideBar) === 'parts'}
          onClick={() =>
            appState.setState((state) => ({
              ...state,
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
              ...state,
              layout: { ...state.layout, leftSideBar: 'snippets' },
            }))
          }
        >
          Snippets
        </Partition.Option>
      </Partition.Container>
      {appState((state) => state.layout.leftSideBar) === 'parts' ? (
        <SideBar.Scrollable>Explorer coming soon!</SideBar.Scrollable>
      ) : (
        <SideBar.Scrollable>Snippets coming soon!</SideBar.Scrollable>
      )}
    </SideBar.Container>
  );
}
