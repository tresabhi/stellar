import devBlueprint from 'assets/blueprints/static/grouping.json';
import * as ContextMenu from 'components/LegacyContextMenu';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import PseudoContainer from 'components/PseudoContainer';
import ToolBarTop from './components/ToolBarTop';
import { importifyBlueprint } from 'core/API/blueprint';
import useBlueprint from 'core/hooks/useBlueprint';
import useContextLayer from 'core/hooks/useContextLayer';
import blueprintStore from 'core/stores/blueprint';

blueprintStore.setState(importifyBlueprint(devBlueprint));

const Desktop = () => {
  const contextLayer = useContextLayer([]);
  const blueprint = useBlueprint();

  return (
    <PseudoContainer occupyTitleBar={true} fullscreen={true} flex={true}>
      <ToolBarTop />
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
      </EditingPanel>
      <ContextMenu.Container
        contexts={contextLayer.state}
        onBlur={contextLayer.removeAll}
      />
    </PseudoContainer>
  );
};

export default Desktop;
