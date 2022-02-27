import { useHelper } from '@react-three/drei';
import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithMeta } from 'parts/Default';
import { MutableRefObject, useEffect } from 'react';
import { BoxHelper, Group, Mesh } from 'three';
import { PartAddress } from 'types/Blueprint';

const usePartMeta = (
  address: PartAddress,
  mesh: MutableRefObject<Mesh | Group>,
) => {
  const helper = useHelper(mesh, BoxHelper, 'dodgerblue');

  useEffect(() => {
    subscribeToPart(
      address,
      (visible) => {
        mesh.current.visible = visible;
      },
      (state: PartWithMeta) => state.meta.visible,
      true,
    );
    subscribeToPart(
      address,
      (selected) => {
        helper.current!.visible = selected;
      },
      (state: PartWithMeta) => state.meta.selected,
      true,
    );
  }, [address, helper, mesh]);
};
export default usePartMeta;
