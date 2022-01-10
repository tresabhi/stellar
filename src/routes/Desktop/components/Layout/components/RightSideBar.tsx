import * as Partition from 'components/Partitions';
import * as SideBar from 'components/SideBar';
import app, { AppType } from 'core/stores/app';
import produce from 'immer';

export default function RightSideBar() {
  return (
    <SideBar.Container width="minor">
      <Partition.Container>
        <Partition.Option
          selected={app((state) => state.layout.rightSideBar) === 'properties'}
          onClick={() =>
            app.setState(
              produce((state: AppType) => {
                state.layout.rightSideBar = 'properties';
              }),
            )
          }
        >
          Properties
        </Partition.Option>
        <Partition.Separator />
        <Partition.Option
          selected={app((state) => state.layout.rightSideBar) === 'inspect'}
          onClick={() =>
            app.setState(
              produce((state: AppType) => {
                state.layout.rightSideBar = 'inspect';
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
            app((state) => state.layout.rightSideBar) === 'properties'
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
          Properties coming soon!
        </span>
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display:
            app((state) => state.layout.rightSideBar) === 'inspect'
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
