import { useTexture } from '@react-three/drei';
import { invalidate, useFrame } from '@react-three/fiber';
import centerOfBuild from 'assets/images/center-of-build.png';
import getCenter from 'core/part/getCenter';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Mesh } from 'three';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import preloadTexture from 'utilities/preloadTexture';

preloadTexture(centerOfBuild);
export default function CenterOfBuild() {
  const mesh = useRef<Mesh>(null);
  const texture = useTexture(centerOfBuild);
  const partOrder = useBlueprint((state) => state.part_order);

  useFrame(({ camera }) => {
    const scale = 16 / camera.zoom;
    mesh.current?.scale.set(scale, scale, scale);
  });

  useEffect(() => {
    const calculateBounds = fallingEdgeDebounce(() => {
      mesh.current?.position.set(...getCenter(partOrder, false), 0);
      invalidate();
    }, 0);

    calculateBounds();

    partOrder.forEach((id) => {
      window.addEventListener(`boundsupdated${id}`, calculateBounds);
    });

    return () => {
      partOrder.forEach((id) => {
        window.removeEventListener(`boundsupdated${id}`, calculateBounds);
      });
    };
  }, [partOrder]);

  return (
    <mesh ref={mesh} visible={partOrder.length > 0}>
      <meshBasicMaterial transparent map={texture} />
      <planeGeometry />
    </mesh>
  );
}
