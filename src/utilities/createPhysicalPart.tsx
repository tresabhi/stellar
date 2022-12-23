import { useGLTF } from '@react-three/drei';
import usePhysicalPart from 'hooks/usePhysicalPart';
import { useRef } from 'react';
import { Group, MeshStandardMaterial, Vector2Tuple } from 'three';
import GLTFResult from 'types/GLTFResult';
import { PartComponentProps } from 'types/Parts';

// TODO: depricate offset

export default function createPhysicalPart(
  model: string,
  offset: Vector2Tuple = [0, 0],
) {
  useGLTF.preload(model);

  function Component({ id }: PartComponentProps) {
    const wrapper = useRef<Group>(null);
    const props = usePhysicalPart(id, wrapper);
    const { nodes } = useGLTF(model) as unknown as GLTFResult;

    const nodeNames = Object.keys(nodes);
    const meshes = nodeNames.map((nodeName) => (
      <mesh
        position={[...offset, 0]}
        geometry={nodes[nodeName].geometry}
        key={`node-${nodeName}`}
      >
        <meshBasicMaterial
          map={(nodes[nodeName].material as MeshStandardMaterial)?.map}
        />
      </mesh>
    ));

    return (
      <group ref={wrapper} {...props}>
        {meshes}
      </group>
    );
  }

  return Component;
}
