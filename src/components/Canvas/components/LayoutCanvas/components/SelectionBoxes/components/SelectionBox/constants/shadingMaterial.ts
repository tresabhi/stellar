import { MeshBasicMaterial } from 'three';
import { SELECTION_BOX_COLOR } from './color';

export const shadingMaterial = new MeshBasicMaterial({
  color: SELECTION_BOX_COLOR,
  transparent: true,
  opacity: 0.25,
});
