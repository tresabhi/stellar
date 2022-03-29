import Part from 'classes/Parts/Part';
import { subscribeToPart } from 'interfaces/blueprint';
import { useEffect } from 'react';
import { UUID } from 'types/Parts';

const usePartMeta = (ID: UUID, callback: () => void) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      () => callback(),
      (state: Part) => state.hidden,
      { fireInitially: true },
    );
    subscribeToPart(
      ID,
      () => callback(),
      (state: Part) => state.selected,
      { fireInitially: true },
    );
  });
};
export default usePartMeta;
