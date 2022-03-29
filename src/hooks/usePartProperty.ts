import { subscribeToPart } from 'interfaces/blueprint';
import { useEffect } from 'react';
import { AnyPart, UUID } from 'types/Parts';

const usePartProperty = <T extends AnyPart, S extends any>(
  ID: UUID,
  slicer: (state: T) => S,
  handler: (slice: S) => void,
) => {
  useEffect(() => {
    subscribeToPart(ID, handler, slicer, {
      fireInitially: true,
    });
  }, [ID, handler, slicer]);
};
export default usePartProperty;
