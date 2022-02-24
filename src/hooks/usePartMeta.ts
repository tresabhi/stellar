import { useHelper } from '@react-three/drei';
import { PartWithMeta } from 'parts/Default';
import { MutableRefObject } from 'react';
import { BoxHelper, Group, Mesh } from 'three';
import { PartAddress } from 'types/Blueprint';
import usePartUpdate from './usePartUpdate';

const usePartMeta = (
  address: PartAddress,
  initialState: PartWithMeta,
  mesh: MutableRefObject<Mesh | Group>,
) => {
  const helper = useHelper(mesh, BoxHelper, 'dodgerblue');

  usePartUpdate(address, initialState, (state) => {
    mesh.current.visible = state.meta.visible;
    helper.current!.visible = state.meta.selected;
  });
};
export default usePartMeta;
