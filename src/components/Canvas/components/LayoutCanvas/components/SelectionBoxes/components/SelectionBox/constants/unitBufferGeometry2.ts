import { BufferGeometry } from 'three';
import { unitVector2Points } from './unitVector2Points';

export const unitBufferGeometry2 = new BufferGeometry().setFromPoints(
  unitVector2Points,
);
