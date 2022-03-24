import Part from 'classes/Blueprint/parts/Part';
import { subscribeToPart } from 'interfaces/blueprint';
import { useEffect } from 'react';
import { PartID } from 'types/Parts';

const usePartMeta = (ID: PartID, callback: () => void) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      () => callback(),
      (state: Part) => state.hidden,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
    subscribeToPart(
      ID,
      () => callback(),
      (state: Part) => state.selected,
      { fireInitially: true, unsubscribeOnUnmount: true },
    );
  });
};
export default usePartMeta;
