import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { Layer } from 'components/LayoutCanvas';
import PartsBounds from './components/PartsBounds';
import ResizeControls from './components/ResizeControls';

export default function Outlines() {
  return (
    <HeadsUpDisplay priority={Layer.Tools}>
      <PartsBounds />
      <ResizeControls />
    </HeadsUpDisplay>
  );
}
