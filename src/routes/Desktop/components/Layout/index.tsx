import EditingCanvas from 'components/EditingCanvas';
import blueprintStore from 'core/stores/blueprint';
import Explorer from './components/Explorer';

export default function Layout() {
  return (
    <div className="editing-panel">
      <Explorer />
      <EditingCanvas
        center={blueprintStore((state) => state.center)}
        offset={blueprintStore((state) => state.offset)}
        parts={blueprintStore((state) => state.parts)}
      />
    </div>
  );
}
