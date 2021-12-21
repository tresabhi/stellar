import devBlueprint from 'assets/blueprints/benchmark/fuel-tank';
import EditingCanvas from 'components/EditingCanvas';
import EditingPanel from 'components/EditingPanel';
import * as Explorer from 'components/Explorer';
import { importifyBlueprint } from 'core/API/blueprint';
import useBlueprint from 'core/hooks/useBlueprint';
import blueprintStore from 'core/stores/blueprint';
import ToolbarBottom from './components/ToolbarBottom';
import ToolBarTop from './components/ToolbarTop';
import './index.scss';

blueprintStore.setState(importifyBlueprint(devBlueprint));

const Desktop = () => {
  const blueprint = useBlueprint();

  return (
    <div className="desktop-container">
      <ToolBarTop />
      <ToolbarBottom />
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
    </div>
  );
};

export default Desktop;
