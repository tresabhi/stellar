import { subscribeToPart } from 'interfaces/blueprint';
import { useEffect } from 'react';
import { AnyPart, UUID } from 'types/Parts';

const usePartMeta = (ID: UUID, callback: () => void) => {
  useEffect(() => {
    subscribeToPart(
      ID,
      () => callback(),
      (state: AnyPart) => state.hidden,
      { fireInitially: true },
    );
    subscribeToPart(
      ID,
      () => callback(),
      (state: AnyPart) => state.selected,
      { fireInitially: true },
    );
  });
};
export default usePartMeta;
