import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { Layer } from 'components/LayoutCanvas';
import EditControls from './components/EditControls';
import PartsBounds from './components/PartsBounds';
import TransformControls from './components/TransformControls';

export default function Outlines() {
  return (
    <HeadsUpDisplay priority={Layer.Tools}>
      <PartsBounds />
      <TransformControls />
      <EditControls />
    </HeadsUpDisplay>
  );
}
