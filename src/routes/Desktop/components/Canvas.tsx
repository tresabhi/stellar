import EditingCanvas from 'components/EditingCanvas';
import blueprintStore from 'core/stores/blueprint';

export function Canvas() {
  return (
    <EditingCanvas
      center={blueprintStore((state) => state.center)}
      offset={blueprintStore((state) => state.offset)}
      parts={blueprintStore((state) => state.parts)}
    />
  );
}
