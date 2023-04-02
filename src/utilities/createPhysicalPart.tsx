import { useGLTF } from '@react-three/drei';
import useModel from 'hooks/useModel';
import usePhysicalPart from 'hooks/usePartPhysical';
import { useRef } from 'react';
import { Group } from 'three';
import { PartComponentProps } from 'types/Parts';

export default function createPhysicalPart(
  model: string,
  flipLighting = true,
  transparent = false,
) {
  useGLTF.preload(model);

  function Component({ id }: PartComponentProps) {
    const wrapper = useRef<Group>(null);
    const props = usePhysicalPart(id, wrapper, flipLighting);
    const meshes = useModel(model, transparent);

    return (
      <group ref={wrapper} {...props}>
        {meshes}
      </group>
    );
  }

  return Component;
}
