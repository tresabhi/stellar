import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import appStore, { AppType } from 'core/stores/app';
import produce from 'immer';
import * as PropertiesExplorer from 'components/PropertiesExplorer';

export default function RightSideBar() {
  return (
    <SideBar.Container width="minor">
      <Partition.Container>
        <Partition.Option
          selected={
            appStore((state) => state.layout.rightSideBar.partition) ===
            'properties'
          }
          onClick={() =>
            appStore.setState(
              produce((state: AppType) => {
                state.layout.rightSideBar.partition = 'properties';
              }),
            )
          }
        >
          Properties
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={
            appStore((state) => state.layout.rightSideBar.partition) ===
            'inspect'
          }
          onClick={() =>
            appStore.setState(
              produce((state: AppType) => {
                state.layout.rightSideBar.partition = 'inspect';
              }),
            )
          }
        >
          Inspect
        </Partition.Option>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display:
            appStore((state) => state.layout.rightSideBar.partition) ===
            'properties'
              ? 'unset'
              : 'none',
        }}
      >
        <PropertiesExplorer.Container>
          <PropertiesExplorer.Group>
            <PropertiesExplorer.Title>Transformations</PropertiesExplorer.Title>
            <PropertiesExplorer.Row>
              <PropertiesExplorer.NamedInput
                title="X"
                defaultValue={12}
                suffix="m"
              />
            </PropertiesExplorer.Row>
          </PropertiesExplorer.Group>
        </PropertiesExplorer.Container>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display:
            appStore((state) => state.layout.rightSideBar.partition) ===
            'inspect'
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
          Inspect coming soon!
        </span>
      </SideBar.Scrollable>
    </SideBar.Container>
  );
}
