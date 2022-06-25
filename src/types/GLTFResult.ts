import { GLTF } from 'three-stdlib';

export default interface GLTFResult extends GLTF {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {};
}
