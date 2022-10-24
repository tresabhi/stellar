import { RefObject } from 'react';
import { Object3D } from 'three';
import usePartProperty from './usePartProperty';

const usePartVisibility = (id: string, mesh: RefObject<Object3D>) => {
  usePartProperty(
    id,
    (state) => state.hidden,
    (hidden) => {
      if (mesh.current) mesh.current.visible = !hidden;
    },
  );
};
export default usePartVisibility;
