import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import GLTFResult from 'types/GLTFResult';

export default function useModel(src: string) {
  useGLTF.preload(src);

  const { nodes } = useGLTF(src) as GLTFResult;
  const nodeNames = Object.keys(nodes);

  return (
    <>
      {nodeNames.map((nodeName) => (
        <mesh geometry={nodes[nodeName].geometry} key={`node-${nodeName}`}>
          <meshBasicMaterial
            map={(nodes[nodeName].material as MeshStandardMaterial)?.map}
          />
        </mesh>
      ))}
    </>
  );
}
