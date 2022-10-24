import { Material, Mesh } from 'three';
import { GLTF } from 'three-stdlib';

export default interface GLTFResult extends GLTF {
  nodes: {
    [key: string]: Mesh;
  };
  materials: {
    [key: string]: Material;
  };
}
