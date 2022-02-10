import { useHelper } from '@react-three/drei';
import { BoxHelper, Group, Mesh } from 'three';
import { AnyPart } from 'types/Parts';
import { UndefinedRefObject } from './useUndefinedRef';

const usePartDecorations = (
  data: AnyPart,
  meshRef: UndefinedRefObject<Mesh | Group>,
) => {
  useHelper(meshRef, data.meta.selected ? BoxHelper : undefined, 'blue');
};

export default usePartDecorations;
