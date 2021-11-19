import devBlueprint from 'assets/blueprints/static/grouping.json';
import * as ContextMenu from 'components/ContextMenu';
import * as RootContextListing from 'core/APIs/contextListings/root';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import useBlueprintCore from 'core/hooks/useBlueprint';
import * as RootPart from 'core/APIs/parts/root';
import useContextLayer from 'core/hooks/useContextLayer';

const Desktop = () => {
  const emptyListing: Array<RootContextListing.contextMenuListing> = [];

  const blueprint = useBlueprintCore(devBlueprint);
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
            onSelect={(address, type) =>
              alert(address.join(', ') + '\n' + type)
            }
            parts={blueprint.state.parts}
            onPartDelete={(index: number) => blueprint.deletePart(index)}
            onPartDataMutate={(data: RootPart.anyPartType, index: number) =>
              blueprint.mutatePartData(data, index)
            }
          />
        </Explorer.Container>

        <EditingCanvas
          center={blueprint.state.center}
          offset={blueprint.state.offset}
          parts={blueprint.state.parts}
        />

        <Explorer.Container rightSide={true}>
          <Explorer.TabsContainer>
            <Explorer.StaticTab>Properties</Explorer.StaticTab>
            {/* <Explorer.PropertyListingContainer /> */}
          </Explorer.TabsContainer>
        </Explorer.Container>
      </EditingPanel>
      <ContextMenu.Container
        contexts={contextLayer.state}
        onBlur={contextLayer.removeAll}
      />
    </PseudoContainer>
  );
};

export default Desktop;

// const lol: type
