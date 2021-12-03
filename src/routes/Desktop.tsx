import devBlueprint from 'assets/blueprints/static/grouping.json';
import * as ContextMenu from 'components/ContextMenu';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import useBlueprint from 'core/hooks/useBlueprint';
import blueprintStore from 'core/stores/blueprint';
import useContextLayer from 'core/hooks/useContextLayer';

const Desktop = () => {
  const contextLayer = useContextLayer([]);
  const blueprint = useBlueprint(devBlueprint);

  return (
    <PseudoContainer occupyTitleBar={true} fullscreen={true} flex={true}>
      <button onClick={() => blueprintStore.setState({ parts: [] })}>
        asd
      </button>
      <ContextMenu.ContextContainer
        toolbar={true}
        data={{
          listing: [
            {
              type: 'extend_button',
              text: 'File',
              extend: {
                x: 12,
                y: 32,
                listing: [
                  {
                    type: 'text_button',
                    text: 'Click me for an alert',
                    onClick: () => alert('what a mighty click bro'),
                  },
                ],
              },
            },
          ],
        }}
      />
      <EditingPanel>
        <Explorer.Container>
          <Explorer.TabsContainer>
            <Explorer.StaticTab>Parts</Explorer.StaticTab>
          </Explorer.TabsContainer>
          <Explorer.PartsListingContainer
            parts={blueprintStore((state) => state.parts)}
            onPartDataMutate={(data, address) =>
              blueprint.mutateParts(data, [address])
            }
            onPartDelete={(address) => blueprint.deleteParts([address])}
            onPartSelect={(type, address) =>
              blueprint.selectParts(type, address)
            }
          />
        </Explorer.Container>

        <EditingCanvas
          center={blueprintStore((state) => state.center)}
          offset={blueprintStore((state) => state.offset)}
          parts={blueprintStore((state) => state.parts)}
        />

        {/* <Explorer.Container rightSide={true} /> */}
      </EditingPanel>
      <ContextMenu.Container
        contexts={contextLayer.state}
        onBlur={contextLayer.removeAll}
      />
    </PseudoContainer>
  );
};

export default Desktop;
