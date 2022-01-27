import { ReactComponent as LinkOff } from 'assets/icons/link-off.svg';
import { ReactComponent as LinkOn } from 'assets/icons/link-on.svg';
import * as Partition from 'components/Partitions';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import * as SideBar from 'components/SideBar';
import * as RootBlueprint from 'interfaces/blueprint/root';
import appStore, { AppType } from 'core/stores/app';
import blueprintStore from 'core/stores/blueprint';
import selectionStore from 'core/stores/selection';
import produce from 'immer';
import './index.scss';

export default function RightSideBar() {
  // const xRef = useRef<HTMLInputElement>(null);

  selectionStore.subscribe((state) => {
    // state.selections[0].p.x;
  });

  return (
    <SideBar.Container className="right-side-bar" width="minor">
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
                onValueAccepted={(value) => {
                  blueprintStore.setState(
                    produce((state: RootBlueprint.Type) => {
                      // const selections = selectionStore.getState().selections;
                      // selections.forEach((part) => {
                      //   const parent = part.relations.
                      // });
                    }),
                  );
                }}
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
              <PropertiesExplorer.ToggleButton
                onClick={() => {
                  appStore.setState(
                    produce((state: AppType) => {
                      state.layout.rightSideBar.scaleConstrained =
                        !state.layout.rightSideBar.scaleConstrained;
                    }),
                  );
                }}
              >
                {appStore(
                  (state) => state.layout.rightSideBar.scaleConstrained,
                ) ? (
                  <LinkOn className="right-side-bar-constrain-icon" />
                ) : (
                  <LinkOff className="right-side-bar-constrain-icon" />
                )}
              </PropertiesExplorer.ToggleButton>
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
