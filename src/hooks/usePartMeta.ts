import { subscribeToPart } from 'interfaces/blueprint';
import { PartWithMeta } from 'parts/Default';
import { useEffect } from 'react';
import { PartID } from 'types/Parts';

const usePartMeta = (ID: PartID, callback: () => void) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      (visible) => callback(),
      (state: PartWithMeta) => state.meta.visible,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
    subscribeToPart(
      ID,
      (selected) => callback(),
      (state: PartWithMeta) => state.meta.selected,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
  });
};
export default usePartMeta;
