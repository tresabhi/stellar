import devBlueprint from 'assets/blueprints/saturnV.json';
import * as ContextMenu from 'components/ContextMenu';
import { contextMenuListing } from 'components/ContextMenu/types/root';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import useBlueprintCore from 'core/blueprint';
import { type as rootPartType } from 'core/blueprint/parts/Root';
import useContextLayer from 'core/useContextLayer';

const Desktop = () => {
  const emptyListing: Array<contextMenuListing> = [];

  const blueprint = useBlueprintCore(devBlueprint);
  const contextLayer = useContextLayer(emptyListing);

  return (
    <PseudoContainer fullscreen={true} flex={true}>
      <ContextMenu.ContextContainer
        toolbar={true}
        data={{
          listing: [
            {
              type: 'text_button',
              text: 'File',
              onClick: () => {
                contextLayer.addContext({
                  x: 400,
                  y: 400,
                  listing: [
                    {
                      type: 'text_button',
                      text: 'Hello There',
                      onClick: () => alert('what a nice click :)'),
                    },
                  ],
                });
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
            parts={blueprint.state.parts}
            onPartDelete={(index: number) => blueprint.deletePart(index)}
            onPartDataMutate={(data: rootPartType, index: number) =>
              blueprint.mutatePartData(data, index)
            }
          />
        </Explorer.Container>

        <EditingCanvas
          center={blueprint.state.center}
          offset={blueprint.state.offset}
          parts={blueprint.state.parts}
        />
      </EditingPanel>
      <ContextMenu.Container
        contexts={contextLayer.state}
        onBlur={contextLayer.removeAll}
      />
    </PseudoContainer>
  );
};

export default Desktop;
