import { useGLTF } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { forwardRef } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import GLTFResult from 'types/GLTFResult';

export const PART_MODEL_PATH = '/assets/models/parts/';

const usePartModel = (fileName: string, modelName: string) => {
  const result = useGLTF(`${PART_MODEL_PATH}${fileName}.gltf`) as GLTFResult;

  const Component = forwardRef<Mesh, MeshProps>((props, ref) => (
    <mesh {...props} ref={ref} geometry={result.nodes[modelName].geometry}>
      <meshBasicMaterial
        map={(result.nodes[modelName].material as MeshStandardMaterial).map}
      />
    </mesh>
  ));

  return Component;
};
export default usePartModel;
