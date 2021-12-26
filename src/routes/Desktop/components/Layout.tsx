import EditingCanvas from 'components/EditingCanvas';
import * as SideBar from 'components/SideBar';
import useBlueprint from 'core/hooks/useBlueprint';
import blueprintStore from 'core/stores/blueprint';

export default function Layout() {
  const blueprint = useBlueprint();

  return (
    <div className="editing-panel">
      <SideBar.Container>
        {/* Tabs here */}
        <SideBar.Scrollable></SideBar.Scrollable>
      </SideBar.Container>
      <EditingCanvas
        center={blueprintStore((state) => state.center)}
        offset={blueprintStore((state) => state.offset)}
        parts={blueprintStore((state) => state.parts)}
      />
    </div>
  );
}
