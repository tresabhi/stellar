import { LineBasicMaterial } from 'three';
import { SELECTION_BOX_COLOR } from './color';

export const outlineMaterial = new LineBasicMaterial({
  color: SELECTION_BOX_COLOR,
});
