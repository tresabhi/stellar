import EditingCanvas from 'components/EditingCanvas';
import * as Explorer from 'components/Explorer';
import useBlueprint from 'core/hooks/useBlueprint';
import blueprintStore from 'core/stores/blueprint';

export default function Layout() {
  const blueprint = useBlueprint();

  return (
    <div className="editing-panel">
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
          onPartSelect={(type, address) => blueprint.selectParts(type, address)}
        />
      </Explorer.Container>
      <EditingCanvas
        center={blueprintStore((state) => state.center)}
        offset={blueprintStore((state) => state.offset)}
        parts={blueprintStore((state) => state.parts)}
      />
    </div>
  );
}
