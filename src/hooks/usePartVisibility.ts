import { invalidate } from '@react-three/fiber';
import { RefObject } from 'react';
import { Object3D } from 'three';
import usePartProperty from './usePartProperty';

export default function usePartVisibility(
  id: string,
  object: RefObject<Object3D>,
) {
  usePartProperty(
    id,
    (state) => state.visible,
    (visible) => {
      if (object.current) {
        object.current.visible = visible;
        invalidate();
      }
    },
  );
}
