import EditingCanvas from 'components/EditingCanvas';
import blueprintState from 'core/stores/blueprintState';
import Explorer from './components/Explorer';
import './index.scss';

export default function Layout() {
  return (
    <div className="editing-panel">
      <Explorer />
      <EditingCanvas
        center={blueprintState((state) => state.center)}
        offset={blueprintState((state) => state.offset)}
        parts={blueprintState((state) => state.parts)}
      />
    </div>
  );
}
