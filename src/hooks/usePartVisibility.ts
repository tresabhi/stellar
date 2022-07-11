import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import usePartProperty from './usePartProperty';

const usePartVisibility = (
  id: string,
  mesh: MutableRefObject<Mesh | Group>,
) => {
  usePartProperty(
    id,
    (state) => state.hidden,
    (hidden) => (mesh.current.visible = !hidden),
  );
};
export default usePartVisibility;
