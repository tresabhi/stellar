import * as Partition from 'components/Partitions';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import * as SideBar from 'components/SideBar';
import appStore, { AppType } from 'core/stores/app';
import produce from 'immer';

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
                initialValue={0}
                suffix="m"
              />
              <PropertiesExplorer.NamedInput
                title="Y"
                initialValue={0}
                suffix="m"
              />
              <PropertiesExplorer.NamedInput
                title="R"
                initialValue={0}
                suffix="°"
                min={0}
                max={360}
              />
            </PropertiesExplorer.Row>
            <PropertiesExplorer.Row>
              <PropertiesExplorer.NamedInput
                title="W"
                initialValue={1}
                suffix="x"
              />
              <PropertiesExplorer.NamedInput
                title="H"
                initialValue={1}
                suffix="x"
              />
              {/* <PropertiesExplorer.ToggleButton>
                Deez nuts
              </PropertiesExplorer.ToggleButton> */}
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
