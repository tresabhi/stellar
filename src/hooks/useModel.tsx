import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
import GLTFResult from 'types/GLTFResult';

export default function useModel(src: string, transparent = false) {
  useGLTF.preload(src);

  const { nodes } = useGLTF(src) as GLTFResult;
  const nodeNames = Object.keys(nodes);
  const lastMaterial = useRef<MeshBasicMaterial>(null);

  return {
    lastMaterial,
    meshes: (
      <>
        {nodeNames.map((nodeName) => (
          <mesh geometry={nodes[nodeName].geometry} key={`node-${nodeName}`}>
            <meshBasicMaterial
              ref={lastMaterial}
              map={(nodes[nodeName].material as MeshStandardMaterial)?.map}
              transparent={transparent}
            />
          </mesh>
        ))}
      </>
    ),
  };
}
