import { updateBlueprint } from 'assets/blueprints';
import devBlueprint from 'assets/blueprints/shapeAndTextures1.json';
import * as ContextMenu from 'components/ContextMenu';
import { contextMenuListing } from 'components/ContextMenu/types/root';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import blueprintCore from 'core/blueprint';
import { type as rootPartType } from 'core/blueprint/parts/Root';
import useContextLayer from 'core/useContextLayer';
import { useEffect, useState } from 'react';

const Desktop = () => {
  const emptyListing: Array<contextMenuListing> = [];

  const blueprint = new blueprintCore(
    ...useState(updateBlueprint(devBlueprint)),
  );
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

/*
  <Explorer.Container rightSide={true}>
    <Explorer.TabsContainer>
      <Explorer.Tab defaultSelected={true}>Properties</Explorer.Tab>
      <Explorer.Tab>Staging</Explorer.Tab>
    </Explorer.TabsContainer>
    <Explorer.ListingContainer>
      <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={0} suffix={'m'} name="X" />, <Explorer.SubPropertyTextInput defaultValue={0} suffix={'m'} name="Y" />]}>Position</Explorer.PropertyListing>
      <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={1} suffix={'x'} name="X" />, <Explorer.SubPropertyTextInput defaultValue={1} suffix={'x'} name="Y" />]}>Scale</Explorer.PropertyListing>
      <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={0} suffix={'°'} />]}>Rotation</Explorer.PropertyListing>
      <Explorer.PropertyListing subProperties={[<Toggle defaultOn={true} />]}>Toggle On</Explorer.PropertyListing>
      <Explorer.PropertyListing subProperties={[<Toggle defaultOn={false} />]}>Toggle Off</Explorer.PropertyListing>
    </Explorer.ListingContainer>
  </Explorer.Container>
*/

/* 
  <LaunchPrompt.ShadeContainer>
    <LaunchPrompt.Container>
      <LaunchPrompt.SubContainer>
        <LaunchPrompt.Title>Draft new...</LaunchPrompt.Title>
        <LaunchPrompt.DraftRow>
          <LaunchPrompt.DraftType icon={<RocketIcon />} name="Blueprint" />
          <LaunchPrompt.DraftType
            enabled={false}
            icon={<PlanetIcon />}
            name="System"
          />
          <LaunchPrompt.DraftType
            enabled={false}
            icon={<TextIcon />}
            name="Translation"
          />
        </LaunchPrompt.DraftRow>

        <LaunchPrompt.InvisibleVerticalSeparator />

        <LaunchPrompt.Title>Import local...</LaunchPrompt.Title>
        <LaunchPrompt.DraftRow>
          <LaunchPrompt.DraftType
            enabled={false}
            icon={<RocketIcon />}
            name="Blueprint"
          />
          <LaunchPrompt.DraftType
            enabled={false}
            icon={<PlanetIcon />}
            name="System"
          />
          <LaunchPrompt.DraftType
            enabled={false}
            icon={<TextIcon />}
            name="Translation"
          />
        </LaunchPrompt.DraftRow>
      </LaunchPrompt.SubContainer>
      <LaunchPrompt.Separator />
      <LaunchPrompt.SubContainer>
        <LaunchPrompt.Title>Open recent...</LaunchPrompt.Title>
        <LaunchPrompt.ResentsColumn>
          <LaunchPrompt.RecentListing
            type="blueprint"
            name="recent_blueprint_example.sebp"
          />
          <LaunchPrompt.RecentListing
            type="system"
            name="recent_system_example.seps"
          />
          <LaunchPrompt.RecentListing
            type="translation"
            name="recent_text_example.setl"
          />
          <LaunchPrompt.RecentListing name="unknown_file_example.abcd" />
        </LaunchPrompt.ResentsColumn>
      </LaunchPrompt.SubContainer>
    </LaunchPrompt.Container>
  </LaunchPrompt.ShadeContainer>
*/
