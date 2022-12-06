import { Layer } from 'components/Canvas/constants/layer';
import HeadsUpDisplay from 'components/HeadsUpDisplay';
import { PartsBounds } from './components/PartsBounds';
import { ResizeControls } from './components/ResizeControls';

export const Outlines = () => (
  <HeadsUpDisplay priority={Layer.Tool}>
    <PartsBounds />
    <ResizeControls />
  </HeadsUpDisplay>
);
