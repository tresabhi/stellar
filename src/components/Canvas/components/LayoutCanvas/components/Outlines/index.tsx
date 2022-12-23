import { Layer } from 'components/Canvas/constants/layer';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import PartsBounds from './components/PartsBounds';
import { ResizeControls } from './components/ResizeControls';

export default function Outlines() {
  return (
    <HeadsUpDisplay priority={Layer.Tool}>
      <PartsBounds />
      <ResizeControls />
    </HeadsUpDisplay>
  );
}
