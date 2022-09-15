import { RefObject } from 'react';
import { Group, Mesh } from 'three';
import usePartProperty from './usePartProperty';

const usePartVisibility = (id: string, mesh: RefObject<Mesh | Group>) => {
  usePartProperty(
    id,
    (state) => state.hidden,
    (hidden) => {
      if (mesh.current) mesh.current.visible = !hidden;
    },
  );
};
export default usePartVisibility;
