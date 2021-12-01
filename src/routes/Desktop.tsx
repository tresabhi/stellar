import devBlueprint from 'assets/blueprints/static/grouping.json';
import * as ContextMenu from 'components/ContextMenu';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import * as RootContextListing from 'core/API/contextListings/types/root';
import useBlueprint from 'core/hooks/useBlueprint';
import useContextLayer from 'core/hooks/useContextLayer';

const Desktop = () => {
  const emptyListing: RootContextListing.contextMenuListing[] = [];

  const blueprintStore = useBlueprint(devBlueprint);
  const contextLayer = useContextLayer(emptyListing);

  return (
    <PseudoContainer occupyTitleBar={true} fullscreen={true} flex={true}>
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
            parts={blueprintStore.state.parts}
            onPartDelete={(address) => blueprintStore.deleteParts([address])}
            onPartDataMutate={(data, address) =>
              blueprintStore.mutateParts(data, [address])
            }
            onPartSelect={(type, address) =>
              blueprintStore.selectParts(type, address)
            }
          />
        </Explorer.Container>

        <EditingCanvas
          center={blueprintStore.state.center}
          offset={blueprintStore.state.offset}
          parts={blueprintStore.state.parts}
        />

        <Explorer.Container rightSide={true} />
      </EditingPanel>
      <ContextMenu.Container
        contexts={contextLayer.state}
        onBlur={contextLayer.removeAll}
      />
    </PseudoContainer>
  );
};

export default Desktop;
