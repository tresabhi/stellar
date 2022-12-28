import { invalidate } from '@react-three/fiber';
import { RefObject } from 'react';
import { Object3D } from 'three';
import usePartProperty from './usePartProperty';

const usePartVisibility = (id: string, mesh: RefObject<Object3D>) => {
  usePartProperty(
    id,
    (state) => state.visible,
    (visible) => {
      if (mesh.current) {
        mesh.current.visible = visible;
        invalidate();
      }
    },
  );
};
export default usePartVisibility;
