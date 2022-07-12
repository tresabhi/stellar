import { useGLTF } from '@react-three/drei';
import { PART_MODEL_PATH } from 'hooks/usePartModel';

export const preloadModel = (fileName: string) => {
  useGLTF.preload(`${PART_MODEL_PATH}${fileName}.gltf`);
};
