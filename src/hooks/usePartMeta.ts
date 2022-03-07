import { useHelper } from '@react-three/drei';
import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithMeta } from 'parts/Default';
import { MutableRefObject, useEffect } from 'react';
import { BoxHelper, Group, Mesh } from 'three';
import { PartID } from 'types/Parts';

const usePartMeta = (ID: PartID, mesh: MutableRefObject<Mesh | Group>) => {
  const helper = useHelper(mesh, BoxHelper, 'purple');

  useEffect(() => {
    subscribeToPart(
      ID,
      (visible) => {
        mesh.current.visible = visible;
      },
      (state: PartWithMeta) => state.meta.visible,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
    subscribeToPart(
      ID,
      (selected) => {
        helper.current!.visible = selected;
      },
      (state: PartWithMeta) => state.meta.selected,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
  }, [ID, helper, mesh]);
};
export default usePartMeta;
